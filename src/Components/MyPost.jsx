import React from 'react';
import { useForm } from 'react-hook-form';

const MyPost = ({handlePost,userImage}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    return (
        <div className="border-2  bg-red-100 border-red-50 rounded-xl p-1 my-2">
        <div className="flex justify-between">
          <img
            className="w-12 h-12 rounded-xl object-cover "
            src={userImage}
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