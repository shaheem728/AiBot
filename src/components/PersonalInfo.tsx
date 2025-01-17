"use client";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../app/redux/store/strore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {API_URL} from './config'
import {
  fetchuserDetail,
  UserDetail,
  refreshToken,
} from "../app/redux/slices/userDetailSlice";
interface PageProps {
  handleStep?: () => void;
  isStep:boolean
}
export default function PersonalInfo({ handleStep,isStep }: PageProps) {
  const [isenable, setEnable] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [id, setId] = useState<number>(0);
  const [token, setToken] = useState<null>(null);
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter()
  useEffect(() => {
    const userData = localStorage.getItem("user");
    const userToken = localStorage.getItem("token");
    if (userData && userToken) {
      const User = JSON.parse(userData);
      const userAccessToken = JSON.parse(userToken);
      setId(User.user_id); // Set the user state
      setToken(userAccessToken.access);
    }
  }, []);

  const { userInfo, status } = useSelector(
    (state: RootState) => state.userDetail
  );
  useEffect(() => {
    if (status === "idle" && id) {
      dispatch(fetchuserDetail(id));
    }
  }, [dispatch, id, status]);
  async function handleForm(formData: FormData) {
    const mobileNumber = formData.get("phone")?.toString() || ""; // Get phone number as string or empty string
    const userData: UserDetail = {
      username: userInfo?.username || "",
      email: formData.get("email")?.toString() || userInfo?.email || "",
      profile: {
        // Only include mobile if a phone number is provided
        ...(mobileNumber ? { mobile: mobileNumber } : {}), // Include mobile only if it's not an empty string
        address:
          formData.get("address")?.toString() ||
          userInfo?.profile.address ||
          "",
      },
      first_name:
        formData.get("first_name")?.toString() || userInfo?.first_name || "",
      last_name:
        formData.get("last_name")?.toString() || userInfo?.last_name || "",
    };
    console.log("userData=", userData);
    try {
      const response = await fetch(`${API_URL}/api/user/update/`, {
        method: "PATCH",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        if (handleStep) {
          handleStep();
          dispatch(fetchuserDetail(id))
        } else {
          setSuccessMsg(true);
          setEnable(false);
          window.location.reload();
        }
      } else {
        const errorData = await response.json();
        if (errorData.profile?.mobile) {
          setErrorMsg(errorData.profile.mobile[0]);
        }
        setSuccessMsg(false);
      }
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setSuccessMsg(false);
    }
  }
  return (
    <div className="flex  ">
      <section className="m-auto items-center mt-2 justify-center bg-gray-50">
        <div className=" w-[75vw]  border rounded-2xl px-6 py-8 bg-white shadow-lg">
          <h1 className="font-extrabold text-4xl text-center mb-6">
            Personal Info
          </h1>
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
                <span className="font-medium">Success fully Changed!</span>
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
                <span className="font-medium">{errorMsg}</span>
              </div>
            </div>
          )}
          <div className="grid">
            {isStep === false && (
              <button
                className="justify-self-end"
                onClick={() => {
                  setEnable(true), refreshToken();
                }}
              >
                <svg
                  className="w-[30px] h-[30px] text-blue-700 hover:text-blue-500 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
            <form action={handleForm}>
              <div className="grid gap-6 mb-6 md:grid-cols-2 ">
                <div>
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First name
                  </label>
                  <input
                    defaultValue={userInfo?.first_name || ""}
                    type="text"
                    id="first_name"
                    name="first_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="last_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last name
                  </label>
                  <input
                    defaultValue={userInfo?.last_name || ""}
                    type="text"
                    id="last_name"
                    name="last_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={userInfo?.profile.mobile || ""}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email address
                  </label>
                  <input
                    defaultValue={userInfo?.email || ""}
                    type="email"
                    id="email"
                    name="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 my-1">
                <label
                  htmlFor="address"
                  className="text-sm font-semibold text-gray-600 mb-2"
                >
                  Address
                </label>
                <textarea
                  defaultValue={userInfo?.profile.address || ""}
                  id="address"
                  name="address"
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your address..."
                ></textarea>
              </div>
              <div className="flex  justify-self-center my-5 ">
                <button
                  type="submit"
                  className="text-white w-48  bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  hidden={!isenable}
                >
                  Submit
                </button>
                <button
                  type="reset"
                  className="text-white w-48  bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  hidden={!isenable}
                  onClick={() => {
                    setEnable(false);
                  }}
                >
                  Cancel
                </button>
              </div>
              {isStep === true&& (
                <div className="flex justify-between">
                  <button
                    className="bg-black flex justify-center items-center  rounded-full text-white py-4 px-14 my-2"
                    onClick={() => router.back()}
                  >
                    <svg
                      className="w-7 h-7 text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 12h14M5 12l4-4m-4 4 4 4"
                      />
                    </svg>
                    Cancel
                  </button>
                  <button
                    className="bg-black flex justify-center items-center  rounded-full text-white py-4 px-14 my-2"
                    type="submit"
                  >
                    Continue
                    <svg
                      className="w-7 h-7 text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 12H5m14 0-4 4m4-4-4-4"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
