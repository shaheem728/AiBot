'use client'
import Link from "next/link";
import { useRouter} from 'next/navigation';
import { useState} from "react";
import {API_URL} from '@/components/config'
export default function Signup() {
  const [errorMsg, setErrorMsg] = useState('');
  const [password, setPassword] = useState("");
  const [mobileNo, setMobileNo] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  
 interface User {
    username: string;
    email: string;
    password: string;
    profile: { 
        mobile: string;
        address:string;
    };
}  
async function handleForm(formData: FormData) {
  // Checking if the password and confirm password match
  if (password !== confirmPassword) {
    setErrorMsg("Passwords do not match");
    return;
  }
  if (mobileNo.length < 10) {
    setErrorMsg("Please enter a 10-digit phone number");
    return;
  }

  const userData: User = {
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    password: password,
    profile: {
      mobile: mobileNo,
      address: "",
    },
  };

  try {
    const response = await fetch(`${API_URL}/api/signup/`, {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    if (response.ok) {
      router.push('/user/login/');
      setErrorMsg('');
    } else {
      // Handle backend validation errors
      if (data.username) {
        setErrorMsg(data.username[0]); // Display the username error message
      } else if (data.email) {
        setErrorMsg(data.email[0]); // Display the email error message
      } else {
        setErrorMsg("An error occurred during signup. Please try again.");
      }
    }
  } catch (error) {
    // Handle network or unexpected errors
    if (error instanceof Error) {
      setErrorMsg(error.message);
    } else {
      setErrorMsg("An unexpected error occurred.");
    }
  }
}
  return (
    <section className="md:px-32 flex flex-col items-center mt-10 my-7 justify-center bg-gray-50">
      <div className="w-full max-w-sm border rounded-2xl px-6 py-1 bg-white shadow-lg">
        <h1 className="font-extrabold text-4xl text-center mb-4">SIGN UP</h1>
                   {errorMsg && (
                          <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                          <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                          </svg>
                          <span className="sr-only">Info</span>
                          <div>
                            <span className="font-medium">{errorMsg}</span> 
                          </div>
                        </div>                
                        )}
        <form className="space-y-6" onSubmit={(e) => {
            e.preventDefault();
            handleForm(new FormData(e.target as HTMLFormElement));
          }}
        >
          {" "}
          <div className="flex flex-col">
            <label
              htmlFor="username"
              className="text-sm font-semibold text-gray-600 mb-2"
            >
              User Name
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your name"
              className="border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
              required
            />
          </div>
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
              onChange={(e)=>setMobileNo(e.target.value)}
              placeholder="Mobile Number"
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
              placeholder="Enter your password"
              className="border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-semibold text-gray-600 mb-2"
            >
              confirm password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              className="border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
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
