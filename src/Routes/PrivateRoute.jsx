import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../Context/UserProvider';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(UserContext);

    console.log(loading)

    const location = useLocation();

    if (loading) {
        return <div>
        loading..
    </div>
    }

    if (user?.email) {
        return children
    }

    return <Navigate to='/login' state={{from:location}} />
    
};

export default PrivateRoute;