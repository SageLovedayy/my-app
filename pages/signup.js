import React, { useState } from "react";
import { useRouter } from "next/router";
import GoogleIcon from "@mui/icons-material/Google";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";
import axios from "axios";
import Alert from "@mui/material/Alert"; // Import the Alert component from MUI

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState(""); // Added success message state
  const [loading, setLoading] = useState(false);

  const signUp = async ({ name, email, username, password }) => {
    try {
      const response = await axios.post(
        "https://mg-fit.vercel.app/api/v1/users/signup",
        {
          name,
          email,
          password,
          passwordConfirm: password, // Add passwordConfirm to match backend expectations
        }
      );

      return response.data; // Return the response data to handle in handleSubmit
      console.log(response);
    } catch (error) {
      console.error("Sign up error:", error);
      return {
        ok: false,
        error: error.response?.data?.message || "An error occurred",
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrMsg("Passwords do not match");
      return;
    }

    setLoading(true); // Start loading

    const result = await signUp({
      name,
      email,
      username,
      password,
    });

    console.log("results", result);
    setLoading(false); // End loading

    if (result.status === "success") {
      setSuccessMsg("Registration successful! Redirecting to login...");
      setTimeout(() => router.push("/login"), 2000); // Redirect after 2 seconds
    } else {
      setErrMsg(result.error || "Sign up failed");
    }
  };

  return (
    <div
      className="h-screen overflow-y-scroll pt-[3.2rem]"
      style={{
        backgroundImage: "url('./assets/images/bodybuild.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        fontFamily: "'Open Sans', sans-serif",
        color: "#333333",
      }}
    >
      {(errMsg || successMsg) && (
        <div className="w-full flex justify-center fixed top-[2rem] right-0 z-50">
          <div className="p-4 sm:w-[50rem] w-[42rem]">
            <Alert
              sx={{
                fontSize: "1.8rem",
                display: "flex",
                boxShadow: "1px 0px 4px 0px rgba(0, 0, 0, 0.1)",
                "& .MuiAlert-icon": {
                  fontSize: "3rem",
                },
                "& .MuiAlert-action": {
                  "& .MuiIconButton-root": {
                    fontSize: "2.6rem",
                  },
                  "& .MuiSvgIcon-root": {
                    fontSize: "2.2rem", // Close button size
                  },
                },
              }}
              severity={errMsg ? "error" : "success"}
              onClose={() => {
                setErrMsg("");
                setSuccessMsg("");
              }}
            >
              {errMsg || successMsg}
            </Alert>
          </div>
        </div>
      )}

      <header className="w-[80%] mx-auto mt-[2rem] flex items-center justify-between">
        <button
          onClick={() => {
            router.push("/");
          }}
          className="text-[1.6rem] font-bold text-[#ef9425] underline hover:text-[#d2790d] transition"
        >
          <HomeIcon style={{ fontSize: 30 }} />
        </button>
        <p className="text-[#fea233] font-bold">MGFit</p>
      </header>

      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-xl overflow-hidden w-[80%] mx-auto justify-between">
        {/* Right Section */}

        <form onSubmit={handleSubmit} className="p-[4rem] w-full md:w-1/2">
          <h5 className="text-[6rem] font-bold py-[4rem] pb-[4.5rem]">
            Sign Up
          </h5>
          <div className="flex flex-col gap-[3.2rem]">
            <p className="text-gray-500 text-[1.4rem]">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500">
                Login here
              </Link>
              .
            </p>
            <div className="space-y-6">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="w-full border-b-2 border-gray-300 px-4 py-2 text-[1.6rem] outline-none"
                required
              />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full border-b-2 border-gray-300 px-4 py-2 text-[1.6rem] outline-none"
                required
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full border-b-2 border-gray-300 px-4 py-2 text-[1.6rem] outline-none"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full border-b-2 border-gray-300 px-4 py-2 text-[1.6rem] outline-none"
                required
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="w-full border-b-2 border-gray-300 px-4 py-2 text-[1.6rem] outline-none"
                required
              />
            </div>
            <div className="flex justify-between items-center my-6">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  defaultChecked
                  className="form-checkbox"
                />
                <span className="text-gray-700 text-[1.6rem]">Remember me</span>
              </label>
              <p className="text-blue-500 text-[1.4rem]">Forgot password?</p>
            </div>
            <button
              type="submit"
              className="rounded-xl w-full text-[1.6rem] px-[5rem] py-[1.4rem] bg-[#ef9425] text-white shadow-lg hover:bg-[#d2790d] transition"
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </div>
        </form>

        {/* Left Section */}
        <div
          className="relative h-auto bg-cover bg-no-repeat w-full md:w-1/2"
          style={{
            backgroundImage: "url('./assets/images/bodybuild.png')",
          }}
        >
          <div className="bg-[#121212] bg-opacity-70 p-8 h-full flex flex-col justify-center gap-[3.2rem] text-center">
            <h1 className="text-white text-[5rem] md:text-[7rem] font-bold">
              Join MGFit
            </h1>
            <p className="text-white text-[1.6rem]">
              Take the first step towards achieving your fitness goals with
              MGFit.
            </p>
            <Link
              href="#"
              className="bg-[#ffffff] text-[#000] flex items-center gap-4 px-[5rem] py-[1.4rem] justify-center text-[1.6rem] rounded-full shadow-lg"
            >
              <GoogleIcon style={{ fontSize: 24 }} />
              Sign up with Google
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
