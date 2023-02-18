import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../Components/Loader';
import { UserContext } from '../Context/UserProvider';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(UserContext);



    const location = useLocation();

    if (loading) {
        return <Loader/>
    }

    if (user?.email) {
        return children
    }

    return <Navigate to='/login' state={{from:location}} />
    
};

export default PrivateRoute;