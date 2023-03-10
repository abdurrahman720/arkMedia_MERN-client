import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { HiUserAdd } from "react-icons/hi";
import { Link, useLoaderData } from "react-router-dom";
import PostComment from "../Components/PostComment";
import { UserContext } from "../Context/UserProvider";

const PostDetails = () => {
  const post = useLoaderData();
  const [fetchedPost, setFetchedPost] = useState(post);

  const {
    _id,
    postUserEmail,
    postUserName,
    postUserImage,
    postImage,
    postDescription,
    likes,
    comments,
  } = fetchedPost;
  const { loggedInUser } = useContext(UserContext);
  const userId = loggedInUser._id;

  const fetchPost = async () => {
    const res = await axios.get(
      `https://ark-media-server.vercel.app/get-post/${_id}`
    );
    const data = res.data;
    setFetchedPost(data);
  };

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const handleLikesPost = (postId, userId) => {
    const likerId = {
      likerId: userId,
    };

    fetch(`https://ark-media-server.vercel.app/like-post/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(likerId),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fetchPost();
      });
  };
  let isLiked = false;
  if (likes.indexOf(userId) !== -1) {
    isLiked = true;
  }

  const handleComment = (data) => {
    const comment = {
      postId: _id,
      commenterId: userId,
      commenterName: loggedInUser.userName,
      commenterEmail: loggedInUser.userEmail,
      commenterImage: loggedInUser.userImage,
      commentText: data?.comment,
    };
    fetch(`https://ark-media-server.vercel.app/add-comments/${_id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(comment),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          reset();
          fetchPost();
          toast.success("Comment posted!");
        }
      });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="border-2 bg-red-100 border-red-50 rounded-xl p-2">
        <div className="flex justify-between">
          <Link to={`/profile/${postUserEmail}`}>
            <div className="flex justify-center items-center">
              <img
                className="w-12 h-12 rounded-xl object-cover "
                src={postUserImage}
                alt="userimage"
              />
              <h5>{postUserName}</h5>
            </div>
          </Link>
          <div className="flex items-center">
            <button>
              <HiUserAdd className="w-10" />
            </button>
          </div>
        </div>
        <div className=" flex flex-col  mt-2">
          <img
            src={postImage}
            className="obeject-cover h-auto w-full rounded-xl"
            alt=""
          />
          <div className="flex justify center p-2">
            <div>
              <button onClick={() => handleLikesPost(_id, userId)}>
                {isLiked ? (
                  <div className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                    {likes.length >= 1 && <p>{likes.length}</p>}
                  </div>
                ) : (
                  <div className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>

                    {likes.length >= 1 && <p>{likes.length}</p>}
                  </div>
                )}
              </button>
            </div>
            <div className="mx-1">
              <button className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                  />
                </svg>
                {comments.length >= 1 && <p>{comments.length}</p>}
              </button>
            </div>
          </div>
          <div>
            <p>{postDescription}</p>
          </div>
          <div className="flex justify-between items-center mt-5">
            <img
              className="w-12 h-12 rounded-xl object-cover "
              src={loggedInUser?.userImage}
              alt="userimage"
            />
            <div className="w-full ml-1">
              <form onSubmit={handleSubmit(handleComment)} className="">
                <div className="flex items-center">
                  <input
                    className="w-full h-10 bg-red-50 rounded-xl p-2"
                    type="text"
                    placeholder="Write a comment"
                    {...register("comment", {
                      required: "comment can't be blank",
                    })}
                  />
                  {errors.comment && (
                    <p className="text-red-600">{errors.comment?.message}</p>
                  )}

                  <input
                    className="w-[50px] btn btn-outline btn-secondary m-2"
                    type="submit"
                    value="post"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>

        {comments.length >= 1 &&
          comments.map((comment) => (
            <PostComment key={comment._id} comment={comment}></PostComment>
          ))}
      </div>
    </div>
  );
};

export default PostDetails;
