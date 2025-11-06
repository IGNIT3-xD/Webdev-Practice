import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from './../firebase.init';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const provider = new GoogleAuthProvider()

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSignIn = () => {
        return signInWithPopup(auth, provider)
    }

    const logout = () => {
        return signOut(auth)
    }

    const updateUser = (data) => {
        return updateProfile(auth.currentUser, data)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currUser) => {
            setUser(currUser)

            //JWT
            // if (currUser) {
            //     const loggedUser = { email: currUser.email }

            //     fetch('http://localhost:5000/getToken', {
            //         method: "POST",
            //         headers: { 'content-type': 'application/json' },
            //         body: JSON.stringify(loggedUser)
            //     })
            //         .then(res => res.json())
            //         .then(data => console.log(data))
            // }

            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const authInfo = {
        user,
        setUser,
        createUser,
        loginUser,
        googleSignIn,
        logout,
        updateUser,
        loading,
    }

    // console.log(user);

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;