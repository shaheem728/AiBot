'use client';
import Link from 'next/link';
import { useState,useEffect } from 'react';
import {API_URL} from '@/components/config'
export default function Page() {
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobile, setMobile] = useState(null);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mobileString = localStorage.getItem('mobile');
      setMobile(mobileString ? JSON.parse(mobileString) : null);
    }
  }, []);
  async function handleForm() {
    // Prevent default form submission behavior
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }
    const data = {
     "password":password,
     "mobile":mobile,
    };
    const response = await fetch(`${API_URL}/api/changepassword/`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const res = await response.json();
      if (response.ok) {
        setErrorMsg('');
        setSuccessMsg(true);
        if (typeof window !== "undefined"){
        localStorage.removeItem('mobile');
        return;
        }
        setTimeout(() => {
          location.href = '/user/login';
        }, 2000);
      } else {
        setErrorMsg(res.message || 'Unexpected error occurred');
      }
 
  }
  return (
    <section className="px-2 md:px-32 flex flex-col items-center mt-10 justify-center bg-gray-50">
      <div className="w-auto border rounded-2xl px-6 py-8 bg-white shadow-lg">
        <h1 className="font-extrabold text-4xl text-center mb-4">Change Password</h1>
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
            <span className="font-medium">Password changed successfully!</span>
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
            <span className="font-medium">{errorMsg}</span>
          </div>
        )}
        <form className="space-y-6" action={handleForm}>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-semibold text-gray-600 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-600 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              className="border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white text-lg font-bold py-3 rounded-full transition"
          >
            Submit
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Don’t have an account?{' '}
          <Link href="/user/signup" className="text-gray-500 hover:text-blue-500 font-medium hover:underline">
            Register
          </Link>
        </p>
        <div className="flex items-center my-4">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="px-2 text-sm text-gray-400">OR</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">
          Forgot your password?{' '}
          <Link href="/user/forgetpassword" className="text-gray-500 hover:text-blue-500 font-medium hover:underline">
            Click here
          </Link>
        </p>
      </div>
    </section>
  );
}
