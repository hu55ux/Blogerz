import React from 'react';
import { useDarkmode } from '../stores/darkmodeStore';

const CardL = ({ blog }) => {
    const { isDarkmodeActive } = useDarkmode();

    const capitalize = (text = "") => {
        if (typeof text !== "string") return "";
        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    const formatDate = (dateString) => {
        if (!dateString) return "—";
        const date = new Date(dateString);
        if (isNaN(date)) return "—";

        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        }).format(date);
    };

    if (!blog) return null;

    return (
        <div
            className={`w-full h-113 flex justify-center items-center transition-all duration-500
                ${isDarkmodeActive ? 'bg-gray-900' : 'bg-white'}`}
        >
            <div
                className='w-304 h-113 cursor-pointer hover:scale-[1.02] rounded-2xl overflow-hidden bg-cover flex justify-center items-end shadow-lg transition-all duration-500'
                style={{
                    backgroundImage: `url(${blog.image})`,
                    filter: isDarkmodeActive ? 'brightness(0.7)' : 'brightness(1)',
                }}
            >
                <div className='w-284 h-40 mb-5 flex flex-col justify-end'>
                    <h1
                        className={`w-25 h-8 flex justify-center items-center text-xl rounded-md transition-all duration-500
                            ${isDarkmodeActive ? 'bg-cyan-700 text-white' : 'bg-cyan-600 text-white'}`}
                    >
                        {capitalize(blog.category)}
                    </h1>

                    <h1
                        className={`w-150 font-medium text-4xl pt-2 transition-all duration-500
                            ${isDarkmodeActive ? 'text-gray-100' : 'text-white'}`}
                    >
                        {capitalize(blog.title)}
                    </h1>

                    <div
                        className={`flex text-xl gap-5 mt-auto transition-all duration-500
                            ${isDarkmodeActive ? 'text-gray-300' : 'text-white'}`}
                    >
                        <h1>{blog.user?.email}</h1>
                        <h1>{formatDate(blog.createdAt)}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardL;


