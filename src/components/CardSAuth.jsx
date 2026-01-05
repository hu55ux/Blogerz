import React from "react";
import { useDarkmode } from "../stores/darkmodeStore";
import api from "../utils/axios.js";
import { Link, useNavigate } from "react-router-dom";

const CardSAuth = ({ blog = {}, refreshAuthorBlogs }) => {
    const { isDarkmodeActive } = useDarkmode();
    const navigate = useNavigate();

    const handleDelete = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!window.confirm("Are you sure you want to delete this blog?")) return;

        try {
            await api.delete(`/blogs/${blog._id}`);
            alert("Blog deleted successfully.");
            if (refreshAuthorBlogs) refreshAuthorBlogs();
        } catch (error) {
            console.error("Delete failed", error.response?.data || error.message);
            if (error.response?.status === 401) {
                alert("Session expired. Please log in again.");
                navigate("/login");
            } else {
                alert("Failed to delete the blog.");
            }
        }
    };

    const capitalize = (text = "") =>
        typeof text === "string" ? text.charAt(0).toUpperCase() + text.slice(1) : "";

    const formatDate = (dateString) => {
        if (!dateString) return "—";
        const date = new Date(dateString);
        return isNaN(date) ? "—" : new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        }).format(date);
    };

    return (
        <div className="relative group w-full h-full">
            {/* Silmə Düyməsi - Link-in üzərində müstəqil durur */}
            <button
                onClick={handleDelete}
                className=
                "absolute top-4 right-4 z-20 bg-red-500/90 hover:bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 transform -translate-y-1.25 group-hover:translate-y-0"
            >
                Remove
            </button>

            <Link
                to={`/details/${blog._id}`}
                className={`flex flex-col h-full rounded-2xl shadow-md transition-all duration-500 overflow-hidden border
                ${isDarkmodeActive
                        ? "bg-gray-800 border-gray-700 text-gray-100 hover:bg-gray-750"
                        : "bg-white border-gray-100 text-gray-900 hover:shadow-xl"}`}
            >
                {/* Şəkil Hissəsi */}
                <div className="aspect-video w-full overflow-hidden">
                    <img
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        src={blog?.image || "https://via.placeholder.com/400x250"}
                        alt={blog?.title || "blog image"}
                    />
                </div>

                {/* Məzmun Hissəsi */}
                <div className="flex flex-col grow p-5">
                    {/* Kateqoriya */}
                    <div className="flex mb-3">
                        <span
                            className={`px-3 py-1 rounded-md text-xs font-semibold transition-all duration-500
                            ${isDarkmodeActive ? "bg-gray-700 text-cyan-400" : "bg-cyan-50 text-cyan-700"}`}
                        >
                            {capitalize(blog?.category)}
                        </span>
                    </div>

                    {/* Başlıq - 3-lü grid üçün text ölçüsü optimallaşdırıldı */}
                    <h1 className="text-xl md:text-2xl font-bold mb-4 line-clamp-2 leading-tight">
                        {capitalize(blog?.title)}
                    </h1>

                    {/* Alt Məlumatlar */}
                    <div className={`mt-auto pt-4 flex flex-col gap-1 border-t border-gray-700/10 dark:border-gray-100/10 text-xs sm:text-sm
                        ${isDarkmodeActive ? "text-gray-400" : "text-gray-500"}`}>
                        <span className="truncate font-medium">{blog?.user?.email}</span>
                        <span>{formatDate(blog?.createdAt)}</span>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default CardSAuth;