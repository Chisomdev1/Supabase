"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../utils/supabase"
import Link from "next/link";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setMessage(error.message);
    else router.push("/dashboard");
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Login</h1>
        <form className="w-full max-w-sm bg-white p-6 rounded shadow-md">
          <div className="mb-4">
          <p className="text-center">{message}</p>
          
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
            </label>
            <input
              type="text"
              placeholder="Enter your Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Login
          </button>
          <p className="text-center">
            Don't have an account{" "}
            <Link className="text-blue-500" href={"/"}>
              create
            </Link>{" "}
          </p>
        </form>
      </div>
    </>
  );
}
