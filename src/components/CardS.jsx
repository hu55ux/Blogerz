import React from "react";
import { useDarkmode } from "../stores/darkmodeStore";
import { Link } from "react-router-dom";

const CardS = ({ blog = {} }) => {
    const { isDarkmodeActive } = useDarkmode();

    const capitalize = (text = "") =>
        typeof text === "string" ? text.charAt(0).toUpperCase() + text.slice(1) : "";

    const formatDate = (dateString) => {
        if (!dateString) return "—";
        const date = new Date(dateString);
        return isNaN(date)
            ? "—"
            : new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            }).format(date);
    };

    return (
        <Link
            to={`/details/${blog._id}`}
            className={`group w-full flex flex-col h-full rounded-2xl shadow-md transition-all duration-500 overflow-hidden
            ${isDarkmodeActive ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"} border`}
        >
            <div className="relative overflow-hidden aspect-video">
                <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={blog?.image || "https://via.placeholder.com/400x250"}
                    alt={blog?.title || "blog image"}
                />
            </div>

            <div className="flex flex-col grow p-4 md:p-5">
                <div className="flex mb-3">
                    <span
                        className={`px-3 py-1 rounded-md text-xs sm:text-sm font-semibold transition-all duration-500
                        ${isDarkmodeActive ? "bg-gray-700 text-cyan-400" : "bg-cyan-50 text-cyan-700"}`}
                    >
                        {capitalize(blog?.category)}
                    </span>
                </div>

                <h1 className={`text-lg sm:text-xl font-bold mb-4 line-clamp-2 transition-all duration-500
                    ${isDarkmodeActive ? "text-gray-100" : "text-gray-900"}`}>
                    {capitalize(blog?.title)}
                </h1>

                <div className="mt-auto pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-gray-700/10 dark:border-gray-100/10 text-xs sm:text-sm">
                    <span className={`font-medium truncate max-w-37.5 ${isDarkmodeActive ? "text-gray-400" : "text-gray-500"}`}>
                        {blog?.user?.email?.split('@')[0] || "User"}
                    </span>
                    <span className={isDarkmodeActive ? "text-gray-500" : "text-gray-400"}>
                        {formatDate(blog?.createdAt)}
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default CardS;