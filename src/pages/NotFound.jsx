import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-900 text-gray-100 px-4">
            <h1 className="text-6xl font-extrabold mb-6 animate-pulse text-cyan-400">
                💫 404 💫
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-center mb-4">
                Oops! This page is not born yet.
            </p>
            <p className="text-lg md:text-xl text-gray-400 text-center">
                Don't worry, you'll be redirected to the blogs page in 3 seconds...
            </p>
        </div>
    );
};

export default NotFound;
