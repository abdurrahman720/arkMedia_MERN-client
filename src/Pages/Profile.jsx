import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserProvider";
import { TbEdit } from "react-icons/tb";
import { MdLocationOn } from "react-icons/md";
import { FaUniversity } from "react-icons/fa";
import Loader from "../Components/Loader";
import MediaCard from "../Components/MediaCard";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { HiUserAdd } from "react-icons/hi";

const Profile = () => {
  const visitUser = useLoaderData();
  console.log(visitUser?.userEmail);
  const [loading, setLoading] = useState(true);

  const { loggedInUser } = useContext(UserContext);
  const [user, setUser] = useState(loggedInUser);
  const [visitor, setVisitor] = useState(false);

  useEffect(() => {
    if (visitUser === undefined) {
      setUser(loggedInUser);
    } else if (visitUser?.userEmail !== user?.userEmail) {
      setUser(visitUser);
      setVisitor(true);
    }
    setLoading(false);
  }, [visitUser?.userEmail, user?.userEmail]);

  const { _id, userImage, userName, userEmail, university, location } = user;
  const [isEditing, setIsEditing] = useState(null);

  const fetchUser = async () => {
    const res = await axios.get(
      `https://ark-media-server.vercel.app/get-user?email=${userEmail}`
    );
    const data = res.data;
    setUser(data);
  };

  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch(
        `https://ark-media-server.vercel.app/get-posts/profile?userId=${_id}`
      );
      const data = await res.json();
      return data;
    },
  });

  const handleEdit = (e) => {
    e.preventDefault();
    const form = e.target;
    const userName = form.userName.value;
    const location = form.location.value;
    const university = form.university.value;

    const updatedProfile = {
      userName,
      location,
      university,
    };

    fetch(`https://ark-media-server.vercel.app/edit-profile/${_id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedProfile),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Profile Updated!");
          fetchUser();
        }
      });

    setIsEditing(null);
  };

  if (isLoading || loading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="w-full max-w-2xl mx-auto">
        <div className="border-2 bg-red-100 border-red-50 rounded-xl p-2">
          <div className="flex justify-end">
            {visitor ? (
              <HiUserAdd />
            ) : (
              <label
                onClick={() => setIsEditing(loggedInUser)}
                htmlFor="edit-modal"
              >
                <TbEdit />
              </label>
            )}
          </div>
          <div className="flex flex-col items-center">
            <div className="">
              <img src={userImage} className="w-24 h-24 rounded-full " alt="" />
            </div>
            <div className="flex flex-col items-center">
              <p className="text-2xl font-arkFont">{userName}</p>
              <p className="text-lg font-ark">{userEmail}</p>
            </div>
          </div>
          <div className="flex items-center">
            <MdLocationOn />
            <p className="ml-2">{location}</p>
          </div>
          <div className="flex items-center">
            <FaUniversity />
            <p className="ml-2">{university}</p>
          </div>
        </div>
      </div>
      {posts.length >= 1 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
          {posts?.map((post) => (
            <MediaCard key={post._id} post={post} />
          ))}
        </div>
      )}
      {isEditing && (
        <div className="edit-modal">
          <input type="checkbox" id="edit-modal" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box relative">
              <label
                htmlFor="edit-modal"
                onClick={() => setIsEditing(null)}
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              <form
                onSubmit={handleEdit}
                className="grid grid-cols-1 gap-3 mt-10"
              >
                <label htmlFor="" className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  name="userName"
                  type="text"
                  defaultValue={userName}
                  className="input w-full input-bordered"
                />
                <label htmlFor="" className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  name="email"
                  type="email"
                  defaultValue={userEmail}
                  readOnly
                  placeholder="Email Address"
                  className="input w-full input-bordered"
                />
                <label htmlFor="" className="label">
                  <span className="label-text">Location</span>
                </label>
                <input
                  name="location"
                  type="text"
                  defaultValue={location}
                  className="input w-full input-bordered"
                />
                <label htmlFor="" className="label">
                  <span className="label-text">University</span>
                </label>
                <input
                  name="university"
                  type="text"
                  defaultValue={university}
                  className="input w-full input-bordered"
                />
                <br />
                <input
                  className="btn btn-accent w-full"
                  type="submit"
                  value="Edit"
                />
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
