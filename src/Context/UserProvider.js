import React, { createContext, useEffect, useState } from 'react';
import { app } from './firebase.config';
import {createUserWithEmailAndPassword,  getAuth,  GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth'

export const UserContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const UserProvider = ({ children }) => {
    const [loading, isLoading] = useState(true);
    const [user, setUser] = useState(null);


    const googleSign = () => {
        isLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const logOut = () => {
        return signOut(auth);
    }

    const emailSignUp = (email,password) => {
        isLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const emailSignIn = (email, password) => {
        isLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const updateName = (name) => {
        return updateProfile(auth.currentUser, { displayName: name });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log('current user:', currentUser);
            isLoading(false);
        })
        
        return () => {
            unsubscribe();
        }
    },[])

    const userInfo = {user, loading, googleSign,logOut,emailSignIn,emailSignUp,updateName,isLoading}

    return (
        <UserContext.Provider value={userInfo}>
            {children}
       </UserContext.Provider>
    );
};

export default UserProvider;