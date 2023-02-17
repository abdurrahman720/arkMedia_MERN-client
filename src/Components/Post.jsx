import React from 'react';
import { HiUserAdd } from "react-icons/hi";



const Post = ({post, userId}) => {
    const { 
        postUserName, postUserImage, postImage, likes } = post;
    const isLiked = likes[userId];
    console.log(isLiked)


    return (
        <div className="border-2  bg-red-100 border-red-50 rounded-xl p-2">
        <div className="flex justify-between">
          <div className="flex justify-center items-center">
            <img
              className="w-12 h-12 rounded-xl object-cover "
              src={postUserImage}
              alt="userimage"
            />
                    <h5>{postUserName}</h5>
          </div>
          <div className="flex items-center">
            <button><HiUserAdd className="w-10" /></button>
          </div>
        </div>
        <div className=" flex flex-col  mt-2">
          <img
            src={postImage}
            className="obeject-cover h-auto w-full rounded-xl"
            alt=""
          />
          <div className="flex justify center p-2">
            <div >
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
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>{" "}
                       
                            {likes.length >= 1 && <p>
                            {likes.length}
                            </p>}
         
            </button>
            </div>
            <div className="mx-1">
                          <button>
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
                         </button>
            </div>
                  </div>
                  <div>
                      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui rerum iusto totam non ipsa quae. Ipsam quasi corporis id reprehenderit, similique placeat nihil deserunt incidunt quae accusamus natus officia ex!</p>
                  </div>
                  <div className="flex">
                     <button className="btn w-[300px] h-8 md:w-96 md:mx-auto btn-secondary btn-outline">Details</button>
                  </div>
        </div>
      </div>
    );
};

export default Post;