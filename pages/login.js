import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import GoogleIcon from "@mui/icons-material/Google";
import { IconButton } from "@mui/material";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (result?.ok) {
      // Login successful
      router.push("/dashboard");
    } else {
      console.error(result);
      alert("Wrong credentials");
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
      <header className="w-[80%] mx-auto mb-[2rem] flex items-center justify-between">
        <button
          onClick={() => router.push("/")}
          className="text-[1.6rem] font-bold text-[#ef9425] underline rounded-full hover:text-[#d2790d] transition"
        >
          {"<- Back"}
        </button>
        <p className="text-[#fea233] mr-[1rem] font-bold">MGFit</p>
      </header>

      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-xl overflow-hidden w-[80%] mx-auto justify-between">
        {/* Left Section */}
        <section
          className="relative h-auto bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url('./assets/images/bodybuild.png')",
          }}
        >
          <div className="bg-[#121212] bg-opacity-70 p-8 h-full flex flex-col gap-[3.2rem]">
            <h1 className="text-white text-[7rem] py-[4rem] pb-[4.5rem] md:text-8xl font-bold my-10">
              Welcome to MGFit
            </h1>
            <p className="text-white text-[1.6rem]">
              Achieve your fitness goals with personalized plans and expert
              guidance. Start your journey today!
            </p>
            <div>
              <Link
                href="#"
                className="bg-[#ffffff] text-[#000] flex items-center gap-4 px-[5rem] py-[1.4rem] justify-center text-[1.6rem] rounded-full shadow-lg"
              >
                <GoogleIcon style={{ fontSize: 24 }} />
                Log in with Google
              </Link>
            </div>
          </div>
        </section>

        {/* Right Section */}
        <form onSubmit={handleSubmit} className="p-[4rem] w-full md:w-1/2">
          <h5 className="text-[6rem] font-bold py-[4rem] pb-[4.5rem]">Login</h5>
          <div className="flex flex-col gap-[3.2rem]">
            <p className="text-gray-500 text-[1.4rem]">
              Don{"'"}t have an account?{" "}
              <Link href="/signup" className="text-blue-500">
                Create Your Account
              </Link>{" "}
              it takes less than a minute.
            </p>
            {/* Input Fields */}
            <div className="space-y-6">
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Username"
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
            </div>
            {/* Remember me and Forgot Password */}
            <div className="flex justify-between items-center my-6">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  defaultChecked
                  className="form-checkbox"
                />
                <span className="text-gray-700 text-[1.6rem]">Remember me</span>
              </label>
              <a href="#" className="text-blue-500 text-[1.4rem]">
                Forgot password?
              </a>
            </div>
            {/* Login Button */}
            <button
              type="submit"
              className="rounded-xl w-full text-[1.6rem] px-[5rem] py-[1.4rem] bg-[#ef9425] text-white shadow-lg hover:bg-[#d2790d] transition"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
