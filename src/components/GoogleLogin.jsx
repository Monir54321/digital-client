import React, { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../firebase/firebase.config';
import { useNavigate } from 'react-router-dom';

const GoogleLogin = () => {

    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user, navigate])

    const handleGoogleLogin = () => {
        signInWithGoogle();
    }
    return (
        <div onClick={() => handleGoogleLogin()} className='btn w-full'>
            <div className='flex items-center gap-2'>
                <FcGoogle size={24} />
                <p>Google</p>
            </div>
        </div>
    );
};

export default GoogleLogin;