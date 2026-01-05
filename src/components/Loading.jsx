import React from 'react';

const Loading = () => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-black/40 backdrop-blur-sm">

            <div className="w-20 h-20 border-4 border-t-cyan-400 border-b-cyan-400 border-gray-300 rounded-full animate-spin mb-6"></div>

            <p className="text-2xl md:text-3xl font-semibold text-white animate-pulse">
                Loading...
            </p>

            <p className="text-sm text-gray-300 mt-2">
                Please wait a moment
            </p>
        </div>
    );
};

export default Loading;
