import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Text, Img, Button } from "../../components";
import Header1 from "components/Header1";
import { BiEdit } from "react-icons/bi";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "components/firebase/firebase.init";
import axios from "axios";
export default function AboutUs() {
  const [user] = useAuthState(auth);
  const [userInfo, setUserInfo] = useState({});
  const getUserById = async () => {
    await axios
      .get(`https://social-backend-jvm1.onrender.com/api/user/${user?.email}`)
      .then((data) => {
        console.log(data);
        setUserInfo(data.data.user);
      });
  };
  useEffect(() => {
    getUserById();
  }, [user]);

  const updateMyProfile = (event) => {
    console.log(event);
    event.preventDefault();
    const updateProfile = {
      name: event.target.name.value,
      email: user.email,
      university: event.target.university.value,
      address: event.target.address.value,
    };

    const email = user.email;
    const url = `https://social-backend-jvm1.onrender.com/api/user/${email}/`;
    fetch(url, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateProfile),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("success", data);
        alert("Update Successfully");

        event.target.reset();
      });
  };
  return (
    <>
      <Header1 />
      <div className="h-screen w-full bg-gray-50 relative">
        <div className="lg:flex flex-wrap justify-center">
          <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
            <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
              <div class="avatar">
                <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={user?.photoURL} alt="" />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center text-center justify-center">
              <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">
                {user?.displayName}{" "}
              </h2>
              <label for="my-modal1" class="">
                <BiEdit className="text-center  text-primary" />
              </label>
              <div className="w-12 h-1 bg-primary rounded mt-2 mb-4"></div>
              {/* <p className="text-base"> */}

              <div className="mx-12 shadow-md border  border-gray-100 lg:w-[900px] rounded-lg">
                <div className="lg:flex flex-wrap justify-center mt-3 relative">
                  <div className="lg:w-2/3  pr-6 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                    <div className="flex justify-between items-center ">
                      <h1 className="mb-5 font-bold text-xl">
                        Personal Information
                      </h1>
                    </div>
                    <hr className="py-3" />
                    <div className="relative z-0 w-full mb-6 group">
                      <lebel className="font-bold">Name: </lebel>
                      <p>{userInfo?.name}</p>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                      <lebel className="font-bold">Email: </lebel>
                      <p>{user?.email}</p>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                      <lebel className="font-bold">Address: </lebel>
                      <p>{userInfo?.address}</p>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                      <lebel className="font-bold">University: </lebel>
                      <p>{userInfo?.university}</p>
                    </div>
                  </div>
                </div>

                {/* pic modal */}
                <input type="checkbox" id="my-modal1" class="modal-toggle" />

                <div class="modal">
                  <div class="modal-box bg-white-A700">
                    <form onSubmit={updateMyProfile}>
                      <div className="relative z-0 w-full mb-6 bg-white-600">
                        <lebel class="font-bold">Name</lebel>
                        <input
                          type="text"
                          name="name"
                          className="input input-primary bg-white   text-white  py-2.5 px-0 w-full text-sm text-gray-900 border-0 border-b-2 border-gray-300 appearance-none"
                          defaultValue={user?.displayName}
                        />
                      </div>
                      <div className="relative z-0 w-full mb-6 group">
                        <lebel class="font-bold">Email</lebel>
                        <input
                          type="text"
                          disabled
                          name="email"
                          className="input input-primary bg-white  text-white  py-2.5 px-0 w-full text-sm text-gray-900 border-0 border-b-2 border-gray-300 appearance-none"
                          defaultValue={user?.email}
                        />
                      </div>
                      <div className="relative z-0 w-full mb-6 group">
                        <lebel class="font-bold">University</lebel>
                        <input
                          type="text"
                          name="university"
                          className="input input-primary bg-white text-white   py-2.5 px-0 w-full text-sm text-gray-900 border-0 border-b-2 border-gray-300 appearance-none"
                        />
                      </div>
                      <div className="relative z-0 w-full mb-6 group">
                        <lebel class="font-bold">Address</lebel>
                        <input
                          type="text"
                          name="address"
                          className="input input-primary  py-2.5 px-0 w-full text-sm text-white border-0 border-b-2 border-gray-300"
                        />
                      </div>
                      <button className="btn btn-primary" type="submit">
                        Update Profile
                      </button>
                    </form>
                    <div class="modal-action">
                      <label for="my-modal1" class="btn">
                        Close
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
