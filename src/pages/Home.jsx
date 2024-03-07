import Header1 from "components/Header1";
import React from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import auth from "components/firebase/firebase.init";
const Home = () => {
  const [user] = useAuthState(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  // const { data, isLoading, refetch } = useQuery("tools", () => fetch("https://langzila-server.onrender.com/ask").then(res => res.json()));

  const imageStorageKey = "3a1e59ad1d3a8caba2efe37f45b560e9";

  // if (isLoading) {
  //   return <Spinner></Spinner>
  // }

  const onSubmit = async (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        if (result.success) {
          const img = result.data.url;
          const post = {
            description: data.description,
            image: img,
            email: user.email,
          };
          console.log(post);
          fetch("https://social-backend-jvm1.onrender.com/api/post/", {
            method: "POST",
            headers: {
              "content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(post),
          })
            .then((res) => res.json())
            .then((insered) => {
              console.log(insered);
              toast.success("Your Post Added");
              reset();
            });
        }
      });
  };
  return (
    <div className=" bg-white-A700">
      <Header1 />
      <div className="h-screen mx-auto bg-white-A700">
        <div className=" mt-36 mx-12 pb-20 shadow-md border border-gray-100 lg:w-[900px] flex justify-center items-center">
          <div className="">
            {" "}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control text-center">
                <label className="label">
                  <span className="mb-2 font-bold text-2xl text-red-500 text-center mx-auto">
                    Please Add post what you wish
                  </span>
                </label>

                <textarea
                  placeholder="Your Description Here"
                  className=" input input-bordered bg-gray-300 text-black-900_99 input-secondary py-2 px-3 rounded max-w-xs "
                  {...register("description", {
                    required: {
                      value: true,
                      message: "Title is Required",
                    },
                  })}
                />
              </div>

              <input
                type="file"
                placeholder="Choose File Here"
                className="mt-5 items-center border py-2 px-3 rounded max-w-xs"
                {...register("image", {
                  required: {
                    value: true,
                    message: "image is required",
                  },
                })}
              />
              <br />
              <div className=" text-center ">
                <input
                  type="submit"
                  className="py-1.5 mt-5 px-3 bg-green-500 text-white rounded "
                  value={"Add Post"}
                />
              </div>
            </form>
          </div>
          {/* <div>{<Answer></Answer>}</div> */}
          <ToastContainer></ToastContainer>
        </div>
      </div>
    </div>
  );
};
export default Home;
