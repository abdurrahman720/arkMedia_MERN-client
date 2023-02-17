import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../Context/UserProvider";
import postImage from "../assets/image.jpg";
import MyPost from "../Components/MyPost";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Post from "../Components/Post";


const Home = () => {
  const { loggedInUser } = useContext(UserContext);
  const { userImage } = loggedInUser;
  const imgHostKey = process.env.REACT_APP_imgbb;
  const navigate = useNavigate()
    
    const handlePost = (data) => {
        console.log(data)
        const img = data.postImage[0];
        console.log(img);
        const formData = new FormData();
        formData.append("image", img);
        const url = `https://api.imgbb.com/1/upload?&key=${imgHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
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
                    }

                    fetch(`http://localhost:5003/add-post`, {
                        method: 'POST',
                        headers: {
                            "content-type": "application/json",
                            authorization: `Bearer ${localStorage.getItem('arkMEDIA')}`
                        },
                        body: JSON.stringify(post)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            if (data.acknowledged) {
                                toast.success("Post shared success!");
                                navigate('/')
                        }
                    })

                }
            })
    
      
    };
    
    const { data: posts, refetch } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5003/get-posts`);
            const data = await res.json();
    
            return data;
        }
    })

    
    

  return (
    <div className="w-full max-w-2xl mx-auto font-arkFont">
        <MyPost handlePost={handlePost} userImage={userImage}></MyPost>
          {
              posts.map(post => <Post key={post._id} userId={loggedInUser._id} post={post}></Post>)
        }
    </div>
  );
};

export default Home;
