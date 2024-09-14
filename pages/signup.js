import React, { useState } from "react";
import { signUp } from "next-auth/react";
import { useRouter } from "next/router";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
      //Signup successful
      router.push("/login");
    } else {
      alert(result.error);
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-[3.2rem]">
        <input
          type="name"
          value={name}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Name"
        />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
