const router = require("express").Router();
const User = require("../models/User");
const Token = require("../models/token");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

router.post("/", async (req, res) => {
  try {
    // Find the user with the provided email
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(404)
        .send({ message: "User with given email not found" });

    // Check if there is an existing token or create a new one
    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }

    const resetPasswordUrl = `${process.env.BASE_URL}password-reset/${user._id}/${token.token}/`;

    const emailBody = `<p>Hello,</p>
      <p>We received a request to reset the password for your account.</p>
      <p>Please click <a href="${resetPasswordUrl}">Password Reset Link</a> to set a new password.</p>
      <p>If you did not request a password reset, please ignore this email.</p>
      <p>Best Regards,</p>
      <p>VoyageVerse</p>`;

    await sendEmail(user.email, "Password Reset", emailBody);

    res.status(200).send({ message: "Password Reset Link Sent to Your Email" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// GET route to verify password reset link
router.get("/:id/:token", async (req, res) => {
  try {
    // Find the user with the provided ID
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    // Find the token and check its validity
    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "Invalid link" });

    res.status(200).send("Valid Url");
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// POST route to reset the password
router.post("/:id/:token", async (req, res) => {
  try {
    // Find the user with the provided ID
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    // Find the token and check its validity
    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "Invalid link" });

    // Update the user's password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user.password = hashedPassword;
    await user.save();

    // Delete the used token
    await Token.deleteOne({ _id: token._id });

    res.status(200).send({ message: "Password Reset Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
