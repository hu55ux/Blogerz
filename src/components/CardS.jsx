import React from "react";
import { useDarkmode } from "../stores/darkmodeStore";

const CardS = ({ blog = {} }) => {
    const { isDarkmodeActive } = useDarkmode();

    const capitalize = (text = "") =>
        typeof text === "string"
            ? text.charAt(0).toUpperCase() + text.slice(1)
            : "";

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
        <div
            className={`w-full h-130 flex transition-all duration-500 justify-center items-center ${isDarkmodeActive ? "bg-gray-900" : "bg-white"
                }`}
        >
            <div
                className={`w-98 h-120 transition-all duration-500 flex flex-col pt-4 rounded-2xl shadow-md ${isDarkmodeActive
                    ? "bg-gray-800 text-gray-100"
                    : "bg-white text-gray-900"
                    }`}
            >
                <img
                    className="w-90 h-60 rounded-2xl mx-4 object-cover"
                    src={blog?.image || null}
                    alt={blog?.title || "blog image"}
                />

                <h1
                    className={`w-25 h-7 ml-5 mt-5 mb-3 transition-all duration-500 flex justify-center items-center rounded-md text-sm font-medium ${isDarkmodeActive
                        ? "bg-gray-700 text-cyan-400"
                        : "bg-gray-200 text-cyan-800"
                        }`}
                >
                    {capitalize(blog?.category)}
                </h1>

                <h1 className="ml-5 text-3xl font-semibold">
                    {capitalize(blog?.title)}
                </h1>

                <div className="flex gap-5 ml-4 mt-5 transition-all duration-500 text-sm font-light">
                    <h1 className={isDarkmodeActive ? "text-gray-300" : "text-gray-700"}>
                        {blog?.user?.email || "—"}
                    </h1>
                    <h1 className={isDarkmodeActive ? "text-gray-300" : "text-gray-700"}>
                        {formatDate(blog?.createdAt)}
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default CardS;
