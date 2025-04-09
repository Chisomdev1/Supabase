"use client";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { supabase } from "../utils/Supabase";

const login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    // Check if email is already registered
    const { data: existingUsers, error: emailCheckError } = await supabase
      .from("auth.users")
      .select("email")
      .eq("email", email);

    if (emailCheckError) {
      console.error("Error checking email:", emailCheckError);
    } else if (existingUsers.length > 0) {
      setMessage("User already exists");
      return;
    }

    // Sign up the user
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email,
        password,
      }
    );

    if (signUpError) {
      setMessage(signUpError.message);
    } else {
      const userId = signUpData.user.id;

      // Save username in profiles table
      const { error: profileError } = await supabase
        .from("profiles")
        .insert([{ id: userId, username }]);

      if (profileError) {
        setMessage("Signup successful, but failed to save username");
      } else {
        setMessage("Registered successfully! Check your email to confirm.");
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Register</h1>
        <form
          className="w-full max-w-sm bg-white p-6 rounded shadow-md"
          onSubmit={handleRegister}
        >
          <p className="text-center">{message}</p>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
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
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmpassword"
              name="confirmpassword"
              
              value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
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
            Have an account{" "}
            <Link className="text-blue-500" href={"/login"}>
              login
            </Link>{" "}
          </p>
        </form>
      </div>
    </>
  );
};

export default login;
