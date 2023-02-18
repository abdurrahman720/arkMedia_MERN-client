import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserProvider';
import Logo from "../assets/png/logo-no-background.png"

const Navbar = () => {
 
  const { logOut, loggedInUser, loading } = useContext(UserContext);
  const navigate = useNavigate();



  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate('/login')
        toast.success('Logged Out!');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (loading) {
    return <div>
      loading...
    </div>
  }


    return (
        <div className="navbar  bg-red-100 ">
        <div className="flex-1">
        <Link to='/'> <img src={Logo} className="w-36 " alt="" /></Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li className="text-secondary"><Link to='/media'>Media</Link></li>
            <li className="text-secondary"><Link>Message</Link></li>
          
            
            <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img src={loggedInUser?.userImage} alt="userImage" />
        </div>
      </label>
      <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <Link to='/profile' className="justify-between">
            Profile
          </Link>
        </li>
        <li><Link>Settings</Link></li>
        <li><Link onClick={handleLogOut}>Log Out</Link></li>
      </ul>
    </div>
        
          </ul>
        </div>
      </div>
    );
};

export default Navbar;