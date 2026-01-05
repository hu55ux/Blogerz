import React from "react";
import { useDarkmode } from "../stores/darkmodeStore";
import { useTokens } from "../stores/tokenStore.js";
import api from "../utils/axios.js";
import { useNavigate } from "react-router-dom";

const CardS = ({ blog = {}, refreshAuthorBlogs }) => {
    // const navigate = useNavigate();
    const { isDarkmodeActive } = useDarkmode();
    const { accessToken, refreshToken, setAccessToken } = useTokens();

    const refreshTokens = async () => {
        try {
            const { data } = await api.post('/auth/refresh', { refreshToken });
            setAccessToken(data.accessToken);
            return data.accessToken;
        } catch (error) {
            console.error("Refresh failed", error.response?.data || error.message);
            return null;
        }
    };

    const handleDelete = async () => {
        let token = accessToken;
        if (!token && refreshToken) {
            token = await refreshTokens();
            if (!token) {
                alert("Session expired. Please log in again.");
                return;
            }
        }
        try {
            const { data } = await api.delete(`/blogs/${blog._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert("Blog deleted successfully.");
            if (refreshAuthorBlogs) refreshAuthorBlogs();
        } catch (error) {
            console.error("Delete failed", error.response?.data || error.message);
            alert("Failed to delete the blog.");
        }
    }

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
            className={`w-full h-160 flex transition-all duration-500 justify-center items-center ${isDarkmodeActive ? "bg-gray-900" : "bg-white"
                }`}
        >
            <div
                // onClick={() => navigate(`/blog/${blog._id}`)}
                className={`w-98 h-145 relative transition-all duration-500 cursor-pointer hover:scale-[1.02] flex flex-col pt-4 rounded-2xl shadow-md ${isDarkmodeActive
                    ? "bg-gray-800 text-gray-100"
                    : "bg-white text-gray-900"
                    }`}
            >
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // klik blog açılmasını dayandırır
                        handleDelete();
                    }}
                    className="absolute top-4 right-4 bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600"
                >
                    Remove
                </button>
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

                <div className="flex gap-5 ml-4 mt-auto mb-5 transition-all duration-500 text-sm font-light">
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
