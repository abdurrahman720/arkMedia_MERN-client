import React from 'react';

const PostComment = ({ comment }) => {

    const { commenterImage, commenterName, commentText } = comment;
    
    return (
        <div className="border-2 rounded-xl mt-2">
                  <div className="flex">
                      <img src={commenterImage} className="w-12 h-12 rounded-xl object-cover " alt="" />
                      <div className="bg-red-50 flex flex-col w-full px-2">
                          <p className="text-secondary">{commenterName}</p>
                          <p className="font-extralight">{commentText} </p>
                      </div>
                  </div>
              </div>
    );
};

export default PostComment;