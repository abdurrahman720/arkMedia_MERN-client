import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserProvider';

const Navbar = () => {

  const { logOut } = useContext(UserContext);
  const navigate = useNavigate()


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


    return (
        <div className="navbar bg-base-100 shadow-2xl">
        <div className="flex-1">
          <Link className="btn btn-ghost normal-case text-xl">daisyUI</Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li><Link>Item 1</Link></li>
            <li tabIndex={0}>
              <Link>
                Parent
                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
              </Link>
              <ul className="p-2 bg-base-100">
                <li><Link>Submenu 1</Link></li>
                <li><Link>Submenu 2</Link></li>
              </ul>
            </li>
            
            <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </label>
      <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <Link className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link>Settings</Link></li>
        <li onClick={handleLogOut}>Log Out</li>
      </ul>
    </div>
        
          </ul>
        </div>
      </div>
    );
};

export default Navbar;