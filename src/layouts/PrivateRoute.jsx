import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import auth from '../firebase/firebase.config';




const PrivateRoute = ({children}) => {
    const [user, loading, error] = useAuthState(auth);
    const location = useLocation();


    if(loading){
        return <Loading/>
    }
    if(error){
        toast.error(error.message)
    }

    if(user){
        return children;
    }

    if(!user){
        toast.error("Please sign in to see this feature.", {id: "notsignin"});
    }
    
return <Navigate to="/" state={{from: location}} replace={true}></Navigate>
}

export default PrivateRoute;