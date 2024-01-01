import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useState } from "react";
import { URL } from "../url";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleResetPassword = async () => {
    try {
      if (!email) {
        setError("Please enter your email.");
        return;
      }

      const response = await axios.post(URL + "/api/passwordReset", { email });
      setMessage(response.data.message);
      setError(null);
    } catch (error) {
      // Handle error
      setMessage(null);
      setError("Error sending reset link. Please try again.");
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
            Enter Your Email to Get Password Reset Link
          </h1>
          <input
            className="w-full px-4 py-2 border-2 border-black outline-0"
            type="text"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="button"
            className="w-full px-4 py-2 text-base font-bold text-white bg-black rounded-lg hover:bg-gray-700 hover:text-white"
            onClick={handleResetPassword}
          >
            Send Reset Link
          </button>
          {message && <p className="text-green-600">{message}</p>}
          {error && <p className="text-red-600">{error}</p>}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPassword;
