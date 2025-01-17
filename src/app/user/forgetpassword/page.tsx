'use client';
import {API_URL} from '@/components/config'
import Link from "next/link";
import { useState, useEffect } from "react";
export default function Page() {
  const [errorMsg, setErrorMsg] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  async function handleMobile() {
    try {
      const mobile_res = await fetch(`${API_URL}/api/mobile-validate/`, {
        method: 'POST',
        body: JSON.stringify({ mobile }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const resData = await mobile_res.json();
      if (mobile_res.ok) {
        setErrorMsg('');
      localStorage.setItem('mobile', mobile);
        const otp_res = await fetch(`${API_URL}/api/otp-validate/`, {
          method: 'GET',
        });
        if (otp_res.ok) {
          const otpData = await otp_res.json();
          setOtp(otpData.otp);
        } else {
          setErrorMsg("Failed to fetch OTP. Please try again.");
        }
      } else {
        setErrorMsg(resData.error || "Something went wrong. Please try again.");
      }
    }catch{
      setErrorMsg("Network error. Please try again later.");
    }
  }
  useEffect(() => {
    if (otp) {
      const otphandling = async () => {
        try {
          const response = await fetch(`${API_URL}/api/otp-validate/`, {
            method: 'POST',
            body: JSON.stringify({ otp }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if(response.ok){
            setTimeout(() => {
             location.href='/user/changepassword'
            },(2000))
            return
          }else{
            setErrorMsg("Failed to validate OTP. Please try again.");
          }
        }catch{
          setErrorMsg("Network error while validating OTP.");
        }
      };
      otphandling();
    }
  }, [otp]);
  return (
    <section className="px-2 md:px-32 flex flex-col items-center mt-10 justify-center bg-gray-50">
      <div className="w-full max-w-sm border rounded-2xl px-6 py-8 bg-white shadow-lg">
        <h1 className="font-extrabold text-4xl text-center mb-4">Forgot Password</h1>
        {otp && (
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
            <div>
              <span className="font-medium">{otp}</span>
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
            <div>
              <span className="font-medium">{errorMsg}</span> Change a few
              things up and try submitting again.
            </div>
          </div>
        )}
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col">
            <label
              htmlFor="mobile"
              className="text-sm font-semibold text-gray-600 mb-2"
            >
              Mobile
            </label>
            <input
              type="tel"
              id="mobile"
              placeholder="Mobile Number"
              className="border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
              required
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
          {otp && (
            <div className="flex flex-col">
              <label
                htmlFor="otp"
                className="text-sm font-semibold text-gray-600 mb-2"
              >
                OTP
              </label>
              <input
                type="number"
                id="otp"
                placeholder="Enter OTP"
                className="border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                value={otp}
                readOnly
              />
            </div>
          )}
          {
            !otp &&  <button
            type="submit"
            className="w-full bg-black text-white text-lg font-bold py-3 rounded-full transition"
            onClick={handleMobile}
          >
            Send
          </button>
          }
         
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Remember Password?{" "}
          <Link
            href="/user/login"
            className="text-gray-500  hover:text-blue-500  font-medium hover:underline"
          >
            Login
          </Link>
        </p>
        <div className="flex items-center my-4">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="px-2 text-sm text-gray-400">OR</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">
          Create New Account?{" "}
          <Link
            href="/user/signup"
            className="text-gray-500  hover:text-blue-500  font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
}
