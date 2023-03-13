import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const MyPost = ({ loggedInUser, refetch }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const imgHostKey = process.env.REACT_APP_imgbb;
  const navigate = useNavigate();
  const [postLoading, setPostLoading] = useState(false);

  const handlePost = (data) => {
    console.log(data);
    setPostLoading(true);
    const img = data.postImage[0];
    console.log(img);
    const formData = new FormData();
    formData.append("image", img);
    const url = `https://api.imgbb.com/1/upload?&key=${imgHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        if (imageData.success) {
          console.log(imageData.data.url);
          //add post
          const post = {
            postUserId: loggedInUser._id,
            postUserEmail: loggedInUser.userEmail,
            postUserName: loggedInUser.userName,
            postUserImage: loggedInUser.userImage,
            postDescription: data.description,
            postImage: imageData.data.url,
            likes: [],
            comments: [],
            timeStamp: new Date(),
          };

          fetch(`https://ark-media-server.vercel.app/add-post`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${localStorage.getItem("arkMEDIA")}`,
            },
            body: JSON.stringify(post),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              if (data.acknowledged) {
                setPostLoading(false);
                toast.success("Post shared success!");
                navigate("/");
                refetch();
                reset();
              }
            });
        }
      });
  };

  if (postLoading) {
    return <Loader />;
  }

  return (
    <div className="border-2  bg-red-100 border-red-50 rounded-xl p-1 my-2">
      <div className="flex justify-between">
        <img
          className="w-12 h-12 rounded-xl object-cover "
          src={loggedInUser?.userImage}
          alt="userimage"
        />
        <div className="w-full">
          <form onSubmit={handleSubmit(handlePost)} className=" divide-y">
            <div className="flex flex-col">
              <input
                className="w-[300px] md:w-full h-24 bg-red-50 rounded-xl p-2"
                type="text"
                placeholder="what is on your mind?"
                {...register("description", {
                  required: "Post Description is required",
                })}
              />
              {errors.description && (
                <p className="text-red-600">{errors.description?.message}</p>
              )}
              <input
                type="file"
                className="mt-2"
                {...register("postImage", { required: "photo is required" })}
              />
              {errors.postImage && (
                <p className="text-red-600" role="alert">
                  {errors.postImage?.message}
                </p>
              )}
              <input
                className="w-[300px] md:w-96 md:mx-auto btn btn-outline btn-secondary m-2"
                type="submit"
                value="share"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyPost;
