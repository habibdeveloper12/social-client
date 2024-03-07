import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Header1 from "../../components/Header1";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "./Spinner/Spinner";
import auth from "components/firebase/firebase.init";

import {
  useAuthState,
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const dropDownOptions = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];

export default function LoginPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [signInWithEmailAndPassword, user4, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [user1] = useAuthState(auth);

  const [signInWithGoogle, user2, gloading, gError] = useSignInWithGoogle(auth);
  useEffect(() => {
    const findUser = async () => {
      if (user1) {
        try {
          console.log("response.data");
          const response = await axios.get(
            `http://localhost:5001/api/v1/user`,
            {
              params: {
                email: user1.email,
              },
            }
          );

          if (response.data) {
            console.log(response.data);
            return;
          } else {
            const registrationResponse = await axios.post(
              "http://localhost:5001/api/user/",
              {
                email: user1.email,

                name: user1.displayName,
              }
            );

            console.log("User registered:", registrationResponse.data);
          }
        } catch (error) {
          console.error("Error in findUser:", error.message);
        }
      }
    };

    findUser();
  }, [user1]);

  const googleProvider = new GoogleAuthProvider();
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { uid, displayName, email } = result.user;
      if (email) {
        try {
          console.log(uid, email, displayName);
          const response = await axios.post(
            "https://social-backend-jvm1.onrender.com/api/user/",
            {
              name: displayName,
              email: email,
            }
          );
          console.log(response);
        } catch (err) {
          console.log(err);
        }
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };
  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
    console.log(data);
  };

  let signInError;
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";
  console.log(user1);

  if (loading || gloading) {
    return <Spinner></Spinner>;
  }

  if (user1) {
    navigate(from, { replace: true });
  }

  if (error) {
    signInError = (
      <p className="text-primary mb-2">
        <small>{error?.message || gError?.message}</small>
      </p>
    );
  }
  return (
    <>
      <Helmet>
        <title>Citygel</title>
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
      </Helmet>
      <div className="flex flex-col items-center justify-start w-full bg-gray-50">
        <Header1 className="flex flex-col justify-center items-center w-full" />
        <div className="h-screen mt-48">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className=" mt-8 input input-bordered input-secondary bg-white-A700 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is Required",
                  },
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    message: "Provide a valid Email",
                  },
                })}
              />
            </label>

            <label className=" mt-8 input input-bordered input-secondary bg-white-A700 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                placeholder="Password"
                type="password"
                className="input-bordered input-secondary bg-white-A700 "
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is Required",
                  },
                  minLength: {
                    value: 8,
                    message: "Must be 8 characters",
                  },
                })}
              />
            </label>
            <button className="btn btn-secondary w-96 mt-4">
              Login using google
            </button>
          </form>
          <div className="mx-auto flex flex-col items-center justify-center">
            <span>or</span>
            <img
              onClick={() => handleGoogleSignIn()}
              className="w-10 h-10 cursor-pointer"
              src="https://steelbluemedia.com/wp-content/uploads/2019/06/new-google-favicon-512.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}
