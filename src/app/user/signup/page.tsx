"use client";
import Link from "next/link";
import { signup } from "./action";
import {useActionState } from "react";
export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined);
  return (
    <section className="md:px-32 flex flex-col items-center mt-10 my-7 justify-center bg-gray-50">
      <div className="w-full max-w-sm border rounded-2xl px-6 py-1 bg-white shadow-lg">
        <h1 className="font-extrabold text-4xl text-center mb-4">SIGN UP</h1>
        {
          state?.errors && (
            <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">{state?.errors}</span> 
            </div>
          </div>
            
          )
        }
        <form className="space-y-6" action={action}>
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="text-sm font-semibold text-gray-600 mb-2"
            >
              User Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className="border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
              required
            />
          </div>
          {state?.errors?.name?.map((error: string, index: number) => (
            <p key={index} className="text-red-600">{error}</p>
          ))}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-gray-600 mb-2"
            >
              email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
              required
            />
          </div>
          {state?.errors?.email?.map((error: string, index: number) => (
          <p key={index} className="text-red-600">{error}</p>
            ))}
          <div className="flex flex-col">
            <label
              htmlFor="mobile"
              className="text-sm font-semibold text-gray-600 mb-2"
            >
              mobile
            </label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              placeholder="Mobile Number"
              className="border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
              required
            />
          </div>
          {state?.errors?.mobile?.map((error: string, index: number) => (
            <p key={index} className="text-red-600">{error}</p>
          ))}
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
          {state?.errors?.password && (
            <div>
              <p>Password must:</p>
              <ul>
                {state.errors.password.map((error: string) => (
                  <li key={error} className="text-red-600">- {error}</li>
                ))}
              </ul>
            </div>
          )}
      
          <button
            type="submit"
            disabled={pending}
            className="w-full bg-black text-white text-lg font-bold py-3 rounded-full  transition"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <Link
            href="/user/login"
            className="text-gray-500 hover:text-blue-500 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
