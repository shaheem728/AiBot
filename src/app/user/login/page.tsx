"use client";
import { API_URL } from '@/components/config'
import Link from "next/link";
import { useState } from "react";
import {setAuthTokens} from '@/utils/actions/auth';
export default function LoginPage() {
  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  async function handelForm(formData: FormData) {
    const data = {
      password: formData.get("password"),
      username: formData.get("name"),
    };
    try {
      const response = await fetch(`${API_URL}/api/login/`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resData = await response.json();
      if (response.ok) {
        const user = {
          user_id: resData.user_id,
          isAdmin:resData.is_admin,
        };
        localStorage.setItem("user", JSON.stringify(user.user_id));
        sessionStorage.setItem("isAdmin",user.isAdmin)
        setAuthTokens(resData.tokens);
        setSuccessMsg(true);
        setErrorMsg("");
        // Redirect to the appropriate page
        const params = new URLSearchParams(window.location.search);
        const redirect = params.get("redirect");
        if (redirect) {
          location.href = redirect;
        } else {
          location.href = '/'
        }
      } else {
        setErrorMsg(resData.error || "Login failed");
        setSuccessMsg(false);
      }
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setSuccessMsg(false);
    }
  }
  return (
    <section className="px-2 md:px-32 flex flex-col items-center mt-10 my-7 justify-center bg-gray-50">
      <div className="w-full max-w-sm border rounded-2xl px-6 py-8 bg-white shadow-lg">
        <h1 className="font-extrabold text-4xl text-center mb-4">LOGIN</h1>
        {successMsg && (
          <div
            className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
            role="alert"
          >
            <svg
              className="flex-shrink-0 inline w-4 h-4 me-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">Thanks for joining us!</span>
            </div>
          </div>
        )}
        {errorMsg && (
          <div
            className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
            role="alert"
          >
            <svg
              className="flex-shrink-0 inline w-4 h-4 me-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">{errorMsg}</span> Change a few
              things up and try submitting again.
            </div>
          </div>
        )}
        <form className="space-y-6" action={handelForm}>
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="text-sm font-semibold text-gray-600 mb-2"
            >
              username
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your username"
              className="border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-gray-600 mb-2"
            >
              password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white text-lg font-bold py-3 rounded-full transition"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Don’t have an account?{" "}
          <Link
            href="/user/signup"
            className="text-gray-500  hover:text-blue-500 font-medium hover:underline"
          >
            Register
          </Link>
        </p>
        <div className="flex items-center my-4">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="px-2 text-sm text-gray-400">OR</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">
          forgot your password?{" "}
          <Link
            href="/user/forgetpassword"
            className="text-gray-500  hover:text-blue-500 font-medium hover:underline"
          >
            click
          </Link>
        </p>
      </div>
    </section>
  );
}
