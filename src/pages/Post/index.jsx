import axios from "axios";
import Header1 from "components/Header1";
import auth from "components/firebase/firebase.init";
import Spinner from "pages/Login/Spinner/Spinner";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { ToastContainer, toast } from "react-toastify";

export default function Posts() {
  const [allPOst, setAllPOst] = useState([]);
  const [perUserId, setPerUserId] = useState({});
  const [user] = useAuthState(auth);
  const [comment, setComment] = useState([]);
  const [perComment, setPerCommment] = useState("");
  const [postId, setPostId] = useState(-1);
  const [like, setLike] = useState(false);
  const allPosts = async () => {
    try {
      await axios
        .get("https://social-backend-jvm1.onrender.com/api/post/")
        .then((data) => {
          console.log(data);
          setAllPOst(data.data.posts);
          console.log(data.data.posts);
          setComment(data.data.posts.comments);
        });
    } catch (err) {
      console.log(err);
    }
  };
  const getUserById = async () => {
    if (user?.email) {
      try {
        await axios
          .get(
            `https://social-backend-jvm1.onrender.com/api/user/${user?.email}/`
          )
          .then((data) => {
            console.log(data);
            setPerUserId(data.data.user._id);
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      return <Spinner />;
    }
  };
  useEffect(() => {
    allPosts();
    getUserById();
  }, [user]);
  console.log(allPOst);

  const handleComment = async (id) => {
    try {
      if (perComment) {
        const response = await axios.post(
          "https://social-backend-jvm1.onrender.com/api/comment/",
          {
            description: perComment,
            postId: id,
            email: user?.email,
          }
        );
        if (response.data) {
          toast.success("Comment Added successful");
          allPosts();
          setPerCommment("");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddLike = async (id) => {
    try {
      if (id) {
        const response = await axios.post(
          `https://social-backend-jvm1.onrender.com/api/post/${id}/like`,
          {
            userId: user?.email,
          }
        );
        if (response.data) {
          toast.success("Like Added successful");
          allPosts();
        }
      }
      setLike(true);
    } catch (err) {
      console.log(err);
    }
  };
  const handleUnLike = async (id) => {
    try {
      if (id) {
        const response = await axios.post(
          `https://social-backend-jvm1.onrender.com/api/post/${id}/unlike`,
          {
            userId: user?.email,
          }
        );
        if (response.data) {
          toast.success("Unlike Added successful");
          allPosts();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleTop = async () => {
    axios
      .get("https://social-backend-jvm1.onrender.com/api/post/top")
      .then((response) => {
        setAllPOst(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <>
      <Header1></Header1>
      <div class="min-h-screen bg-gray-100 flex justify-center items-start">
        <div>
          {" "}
          {allPOst.map((item) => (
            <>
              <div class="bg-gray-100 h-screen flex items-center justify-center">
                <div class="bg-white p-4 rounded-lg shadow-md max-w-md">
                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center space-x-2">
                      <img
                        src="https://placekitten.com/40/40"
                        alt="User Avatar"
                        class="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p class="text-gray-800 font-semibold">
                          {item.author.name}
                        </p>
                        <p class="text-gray-500 text-sm">{item.createdAt}</p>
                      </div>
                    </div>
                    <div class="text-gray-500 cursor-pointer">
                      <button class="hover:bg-gray-50 rounded-full p-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <circle cx="12" cy="7" r="1" />
                          <circle cx="12" cy="12" r="1" />
                          <circle cx="12" cy="17" r="1" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div class="mb-4">
                    <p class="text-gray-800">{item.description}</p>
                  </div>

                  <div class="mb-4">
                    <img
                      src={item.image}
                      alt="Post Image"
                      class="w-full h-48 object-cover rounded-md"
                    />
                  </div>

                  <div class="flex items-center justify-between text-gray-500">
                    <div class="flex items-center space-x-2">
                      {item.likes.includes(perUserId) ? (
                        <button
                          onClick={() => handleUnLike(item._id)}
                          className="flex items-center space-x-2 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                        >
                          <svg
                            class="w-5 h-5 fill-red"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 21.35l-1.45-1.32C6.11 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-4.11 6.86-8.55 11.54L12 21.35z" />
                          </svg>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAddLike(item._id)}
                          class="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1"
                        >
                          <svg
                            class="w-5 h-5 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 21.35l-1.45-1.32C6.11 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-4.11 6.86-8.55 11.54L12 21.35z" />
                          </svg>
                        </button>
                      )}

                      <span>{item.likes.length} Likes</span>
                    </div>
                    <button class="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
                      <svg
                        width="22px"
                        height="22px"
                        viewBox="0 0 24 24"
                        class="w-5 h-5 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22ZM8 13.25C7.58579 13.25 7.25 13.5858 7.25 14C7.25 14.4142 7.58579 14.75 8 14.75H13.5C13.9142 14.75 14.25 14.4142 14.25 14C14.25 13.5858 13.9142 13.25 13.5 13.25H8ZM7.25 10.5C7.25 10.0858 7.58579 9.75 8 9.75H16C16.4142 9.75 16.75 10.0858 16.75 10.5C16.75 10.9142 16.4142 11.25 16 11.25H8C7.58579 11.25 7.25 10.9142 7.25 10.5Z"
                          ></path>
                        </g>
                      </svg>
                      <span> {item.comments.length} Comment</span>
                    </button>
                  </div>
                  <hr class="mt-2 mb-2" />
                  <p class="text-gray-800 font-semibold">All Comment</p>
                  <hr class="mt-2 mb-2" />
                  <div class="mt-4">
                    {item.comments.map((items) => (
                      <div class="flex items-center space-x-2 mt-3 border border-1">
                        <img
                          src="https://placekitten.com/32/32"
                          alt="User Avatar"
                          class="w-6 h-6 rounded-full"
                        />
                        <div>
                          <p class="text-gray-800 font-semibold">
                            {items?.author?.name}
                          </p>
                          <p class="text-gray-500 text-sm">
                            {items?.description}
                          </p>
                        </div>
                      </div>
                    ))}

                    <div className="flex flex-row pt-6 items-center justify-center gap-2">
                      <input
                        onChange={(e) => setPerCommment(e.target.value)}
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered border-r-4 input-secondary w-full max-w-xs"
                      />
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleComment(item._id)}
                      >
                        Comment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <ToastContainer></ToastContainer>
            </>
          ))}
        </div>
        <div>
          <h2 className="text-primary">Popular Post</h2>
          <button className="btn btn-primary" onClick={handleTop}>
            top 3 post based on React
          </button>
        </div>
      </div>
    </>
  );
}
