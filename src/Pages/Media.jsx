import { useQuery } from "@tanstack/react-query";
import React from "react";
import MediaCard from "../Components/MediaCard";

const Media = () => {
  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch(`https://ark-media-server.vercel.app/get-posts`);
      const data = await res.json();

      return data;
    },
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
      {posts?.map((post) => (
        <MediaCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Media;
