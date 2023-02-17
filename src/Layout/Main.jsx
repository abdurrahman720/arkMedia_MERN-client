import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { UserContext } from '../Context/UserProvider';

const Main = () => {

    return (
        <div>
            <Navbar />
            <Outlet/>
        </div>
    );
};

export default Main;