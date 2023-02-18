import React, { useContext, useMemo } from "react";
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
  
    const { data: posts, refetch } = useQuery({
      queryKey: ['posts'],
      queryFn: async () => {
        const res = await fetch(`http://localhost:5003/get-posts`);
        const data = await res.json();
  
        return data;
      }
    });

    const handleLikes = (postId) => {

        const likerId = {
            likerId: loggedInUser._id
        }

        fetch(`http://localhost:5003/like-post/${postId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(likerId)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                refetch();    
        })


    }



  
    const memoizedPosts = useMemo(() => posts, [posts]);
  
    return (
      <div className="w-full max-w-2xl mx-auto font-arkFont">
            <MyPost loggedInUser={loggedInUser} refetch={refetch } />
        {memoizedPosts?.map(post => <Post key={post._id} post={post} handleLikes={handleLikes} userId={loggedInUser._id} />)}
      </div>
    );
  };
  
  export default Home;
  
