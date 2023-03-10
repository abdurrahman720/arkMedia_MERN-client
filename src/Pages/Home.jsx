import React, { useContext, useMemo } from "react";
import { UserContext } from "../Context/UserProvider";
import MyPost from "../Components/MyPost";
import { useQuery } from "@tanstack/react-query";
import Post from "../Components/Post";

const Home = () => {
  const { loggedInUser } = useContext(UserContext);

  const { data: posts, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch(
        `https://ark-media-server.vercel.app/get-posts`
      );
      const data = await res.json();

      return data;
    },
  });

  const handleLikes = (postId, userId, refetch) => {
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
        refetch();
      });
  };

  const memoizedPosts = useMemo(() => posts, [posts]);

  return (
    <div className="w-full max-w-2xl mx-auto font-arkFont">
      <MyPost loggedInUser={loggedInUser} refetch={refetch} />
      {memoizedPosts?.map((post) => (
        <Post
          key={post._id}
          post={post}
          handleLikes={handleLikes}
          refetch={refetch}
          userId={loggedInUser._id}
        />
      ))}
    </div>
  );
};

export default Home;
