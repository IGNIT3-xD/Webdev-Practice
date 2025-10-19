import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './../firebase.init';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [bulletine, setBulletine] = useState([])

    const createUser = (email, pass) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, pass);
    }

    const logIn = (email, pass) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, pass);
    }

    const userSignOut = () => {
        setLoading(true)
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    useEffect(() => {
        fetch('/news.json')
            .then(res => res.json())
            .then(data => {
                const filteredData = data.filter(data => data.others.is_today_pick === true)
                setBulletine(filteredData)
            })
    }, [])

    const authInfo = {
        createUser,
        logIn,
        userSignOut,
        user,
        loading,
        bulletine,
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;