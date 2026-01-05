import React from 'react';
import { useDarkmode } from '../stores/darkmodeStore';
import { Link } from 'react-router-dom';

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
            className={`w-full flex justify-center items-center py-6 px-4 transition-all duration-500
                ${isDarkmodeActive ? 'bg-gray-900' : 'bg-white'}`}
        >
            <Link
                to={`/details/${blog._id}`}
                className='w-full max-w-7xl'
            >
                <div
                    className='relative w-full h-75 md:h-112.5 lg:h-137.5 cursor-pointer hover:scale-[1.01] rounded-3xl overflow-hidden bg-cover bg-center flex items-end shadow-2xl transition-all duration-500'
                    style={{
                        backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8), transparent), url(${blog.image})`,
                        filter: isDarkmodeActive ? 'brightness(0.8)' : 'brightness(1)',
                    }}
                >
                    <div className='p-6 md:p-12 w-full'>
                        <div
                            className={`inline-flex px-4 py-1 mb-4 text-sm md:text-base font-semibold rounded-lg transition-all duration-500
                            ${isDarkmodeActive ? 'bg-cyan-700 text-white' : 'bg-cyan-600 text-white'}`}
                        >
                            {capitalize(blog.category)}
                        </div>

                        <h1
                            className={`block font-bold text-2xl md:text-4xl lg:text-5xl max-w-3xl leading-tight transition-all duration-500
                            ${isDarkmodeActive ? 'text-gray-100' : 'text-white'}`}
                        >
                            {capitalize(blog.title)}
                        </h1>

                        <div
                            className={`flex flex-wrap items-center gap-3 md:gap-6 mt-4 text-sm md:text-lg transition-all duration-500
                            ${isDarkmodeActive ? 'text-gray-300' : 'text-gray-200'}`}
                        >
                            <span className="font-medium">{blog.user?.email}</span>
                            <span className="hidden md:inline">•</span>
                            <span>{formatDate(blog.createdAt)}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default CardL;