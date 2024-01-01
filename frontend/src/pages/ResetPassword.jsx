import Footer from "../components/Footer";
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { URL } from "../url";

const ResetPassword = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async () => {
    try {
      const response = await axios.post(
        URL + `/api/passwordReset/${id}/${token}`,
        {
          password,
        }
      );

      if (response.status === 200) {
        setMessage(
          "Password reset successfully. You can now log in with your new password."
        );
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error resetting password. Please try again.");
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="text-4xl md:text-xl font-extrabold">
          <Link
            to="/"
            className="no-underline text-white hover:text-gray-300 bg-black px-4 py-2"
          >
            VoyageVerse
          </Link>
        </h1>
      </div>

      <div className="w-full flex justify-center items-center h-[80vh]">
        <div className="flex flex-col justify-center items-center space-y-4 w-full md:w-[30%] max-w-[80%]">
          <h1 className="text-xl font-bold text-left">
            Enter Your New Password
          </h1>
          <input
            className="w-full px-4 py-2 border-2 border-black outline-0"
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="w-full px-4 py-2 text-base font-bold text-white bg-black rounded-lg hover:bg-gray-700 hover:text-white"
            onClick={handleResetPassword}
          >
            Confirm Password Reset
          </button>

          {message && <p className="text-green-800">{message}</p>}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ResetPassword;
