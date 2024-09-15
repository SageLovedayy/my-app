import React, { useState } from "react";
import { signUp } from "next-auth/react";
import { useRouter } from "next/router";
import GoogleIcon from "@mui/icons-material/Google";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";
import { MOCK_USERS } from "@/utils/mock-users";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signUp = async ({ name, email, username, password }) => {
    console.log(MOCK_USERS);
    const existingUser = MOCK_USERS.find(
      (user) => user.username === username || user.email === email
    );

    if (existingUser) {
      return { ok: false, error: "Username or email already exists" };
    }

    const newUser = {
      id: MOCK_USERS.length + 1,
      name,
      email,
      username,
      password,
    };

    MOCK_USERS.push(newUser); // Add new user to the shared array
    return { ok: true, user: newUser };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signUp({
      redirect: false,
      name,
      email,
      username,
      password,
    });

    if (result.ok) {
      router.push("/login");
    } else {
      alert(result.error);
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
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="w-full border-b-2 border-gray-300 px-4 py-2 text-[1.6rem] outline-none"
              />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full border-b-2 border-gray-300 px-4 py-2 text-[1.6rem] outline-none"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full border-b-2 border-gray-300 px-4 py-2 text-[1.6rem] outline-none"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full border-b-2 border-gray-300 px-4 py-2 text-[1.6rem] outline-none"
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="w-full border-b-2 border-gray-300 px-4 py-2 text-[1.6rem] outline-none"
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
            >
              Sign Up
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
