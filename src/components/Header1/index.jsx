import React from "react";
import { Button, Text, Img } from "./..";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "components/firebase/firebase.init";
import { signOut } from "firebase/auth";

export default function Header1({ ...props }) {
  const navigate = useNavigate();

  const [user] = useAuthState(auth);
  return (
    <header
      {...props}
      className="bg-[url('images/img_frame_3923.svg')] w-full h-[60px]  "
    >
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link to="/">Demo</Link>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <ul className="flex flex-rows flex-wrap gap-4">
              <li className="cursor-pointer ">
                {" "}
                <Link to="/posts">Media</Link>
              </li>
              <li className="cursor-pointer">
                {" "}
                <Link to="/message">Message</Link>
              </li>
              <li className="cursor-pointer">
                {" "}
                <Link to="/about">About</Link>{" "}
              </li>
              <li>
                {user?.uid ? (
                  <button
                    style={{ fontFamily: "Nunito" }}
                    onClick={() => signOut(auth)}
                    className=" bg-red-500 text-white font-medium rounded py-[6px] px-5"
                  >
                    <Link to="">Logout</Link>
                  </button>
                ) : (
                  <button
                    style={{ fontFamily: "Nunito" }}
                    className=" bg-red-500 text-white font-medium rounded py-[6px] px-5"
                  >
                    <Link to="/login">Login</Link>
                  </button>
                )}
              </li>
            </ul>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
