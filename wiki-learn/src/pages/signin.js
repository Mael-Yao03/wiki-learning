import Header from "@/components/Header";
import { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import Swal from 'sweetalert2';

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const data = await response.json();
      if (typeof window !== "undefined") {
        localStorage.setItem("token", data.token);
      }
      Swal.fire({
        title: 'Success!',
        text: 'Login successful!',
        icon: 'success',
        confirmButtonText: 'Super !'
      })
      Router.push("/");
    } catch (error) {
      setError(error.message);
    }
  };

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const savedToken = localStorage.getItem("token");
  //     if (!savedToken) {
  //       Router.push("/signin");
  //     }
  //   }
  // }, [Router]);

  return (
    <div>
      <Header />
      <h1 className="text-center font-semibold text-4xl">Login</h1> <br />
      {error && <p>{error}</p>}
      <form
        onSubmit={handleLogin}
        className="space-y-4 font-[sans-serif] m-10 max-w-xl mx-auto"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-blue-500 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-transparent focus:border-blue-500 rounded"
        />
        <button
          type="submit"
          className="!mt-8 w-full px-4 py-2.5 mx-auto block text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      
    </div>
  );
}
