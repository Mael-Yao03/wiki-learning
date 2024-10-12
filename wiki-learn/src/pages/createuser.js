import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Swal from 'sweetalert2';

export default function Home() {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isAdmin, setIsadmin] = useState(null);
  const router = useRouter();
  const [aff, setAff] = useState(false);

  async function AddUser() {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        isAdmin: isAdmin,
      }),
    });

    if (!res.ok) {
      Swal.fire({
        title: 'Error !',
        text: 'Failed to create user',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      
      router.push("/createuser");
    } else {
      Swal.fire({
        title: 'Success!',
        text: 'User created successfully',
        icon: 'success',
        confirmButtonText: 'Super !'
      })
      router.push("/admin");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    AddUser();
  }

  useEffect(() => {
    async function checkAuth() {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/signin");
          return;
        }

        try {
          const res = await fetch("/api/verif", {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (!res.ok) {
            console.error("Response Error:", res.status);
            if (res.status === 400) {
              console.error(
                "Bad Request: Possibly malformed token or request body"
              );
            }
            router.push("/signin");
            return;
          }

          const data = await res.json();

          if (data.user.isAdmin === true) {
            setAff(true);
          } else {
            router.push("/");
            Swal.fire({
              title: 'Error !',
              text: "Vous n'êtes pas autorisés à accéder à cette page",
              icon: 'error',
              confirmButtonText: 'Ok'
            })
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
          router.push("/signin");
        }
      }
    }

    checkAuth();
  }, [router, aff]);

  return (
    <>
    {aff == true ? (
      <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
          <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">
            Add a new user
          </h1>
          <form method="post" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                for="username"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="your@email.com"
                required
              />
            </div>
            <div className="mb-4">
              <label
                for="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                id="email"
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="your@email.com"
                required
              />
            </div>
            <div className="mb-4">
              <label
                for="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                id="password"
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="mb-4">
              <label
                for="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Rôle
              </label>
              <select
                id="countries"
                name="isAdmin"
                value={isAdmin}
                onChange={(event) => setIsadmin(event.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="false">User</option>
                <option value="true">Admin</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create
            </button>
            <br />
            <Link href={"/admin"}>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Retour
              </button>
            </Link>
          </form>
        </div>
      </div>
      ) : (
        <h1 className="text-center p-10">Loading ⌛</h1>
      )}
    </>
  );
}
