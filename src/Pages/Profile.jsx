import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { UserContext } from '../Context/UserProvider';
import { TbEdit } from 'react-icons/tb'
import {MdLocationOn} from 'react-icons/md' 
import { FaUniversity } from 'react-icons/fa';
import Loader from '../Components/Loader';
import MediaCard from '../Components/MediaCard';

const Profile = () => {
    const { loggedInUser } = useContext(UserContext);
    const { _id,userImage, userName, userEmail, university, location } = loggedInUser;

    // const { data: profile, isLoading, refetch } = useQuery({
    //     queryKey: ['profile'],
    //     queryFn: async () => {
    //         const res = await fetch(``)
    //     }
    // })

    const { data: posts, isLoading } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
          const res = await fetch(`http://localhost:5003/get-posts/profile?userId=${_id}`);
          const data = await res.json()
          return data;
        },
    });

    if (isLoading) {
        return <Loader/>
    }


    return (
        <div>
            <div className="w-full max-w-2xl mx-auto">
            <div className="border-2 bg-red-100 border-red-50 rounded-xl p-2">
                <div className="flex justify-end">
                    <button>
                    <TbEdit/>
                   </button>
                </div>
                <div className="flex flex-col items-center">
                    <div className=''>
                        <img src={userImage} className="w-24 h-24 rounded-full " alt="" />
                    </div>
                    <div className='flex flex-col items-center'>
                        <p className="text-2xl font-arkFont">
                            {userName}
                        </p>
                        <p className='text-lg font-ark'>
                            {userEmail}
                        </p>
                    </div>
                </div>
                <div className='flex items-center'>
                 <MdLocationOn/>
                 <p className='ml-2'>
                     {location}
                 </p>
             </div>
                <div className='flex items-center'>
                 <FaUniversity/>
                 <p className='ml-2'>
                     {university}
                 </p>
             </div>
            </div>
            </div>
            {posts.length >= 1 && 
            <div  className='grid grid-cols-2 md:grid-cols-4 gap-1'>
                    {
                        posts?.map(post => <MediaCard key={post._id } post={post} />)
               }
            </div>
            }
        </div>
    );
};

export default Profile;