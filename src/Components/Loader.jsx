import React from 'react';
import logo from '../assets/png/logo-color.png'
const Loader = () => {
    return (
        <div className="flex justify-center items-center h-screen animate-bounce">
      <img className="h-12 w-12" src={logo} alt="Logo" />
    </div>
    );
};

export default Loader;