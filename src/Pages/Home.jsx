import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../Context/UserProvider";
import postImage from "../assets/image.jpg";
import MyPost from "../Components/MyPost";


const Home = () => {
  const { loggedInUser } = useContext(UserContext);
  const { userImage } = loggedInUser;



  const handlePost = (data) => {
    console.log(data);
  };

  return (
    <div className="w-full max-w-2xl mx-auto font-arkFont">
        <MyPost userImage={userImage}></MyPost>

    </div>
  );
};

export default Home;
