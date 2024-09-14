import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='flex justify-center flex-col items-center h-screen '>
            <h1 className='text-3xl text-red-400'>404 NOT FOUND</h1>
            <Link className='mt-3 text-blue-600 font-semibold' to={"/dashboard"}>Go Back</Link>
        </div>
    );
};

export default ErrorPage;