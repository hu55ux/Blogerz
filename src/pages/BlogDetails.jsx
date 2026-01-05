import React, { useState, useEffect } from 'react';
import NavbarSt from '../components/NavbarSt.jsx';
import api from '../utils/axios.js';
import { useDarkmode } from '../stores/darkmodeStore.js';
import Footer from '../components/Footer.jsx';
import { useParams } from 'react-router-dom';

const BlogDetails = () => {
    const [blog, setBlog] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const { isDarkmodeActive } = useDarkmode();
    const { blogId } = useParams();

    const getBlogById = async () => {
        try {
            const { data } = await api.get(`/blogs/blog/${blogId}`);
            setBlog(data);
        } catch (error) {
            console.error("Error fetching blog:", error.message);
        }
    };

    // Axtarış funksiyası (əgər bu səhifədə lazımdırsa)
    const handleSearchChange = (value) => {
        setSearchTerm(value);
        // Burada axtarış məntiqi və ya ana səhifəyə yönləndirmə ola bilər
    }

    const capitalize = (text = "") =>
        text ? text.charAt(0).toUpperCase() + text.slice(1) : "";

    const formatDate = (dateString) => {
        if (!dateString) return "—";
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    useEffect(() => {
        if (blogId) getBlogById();
    }, [blogId]);

    if (!blog) return <div className="h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className={`w-full min-h-screen transition-all duration-500 ${isDarkmodeActive ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'
            }`}>
            <NavbarSt searchTerm={searchTerm} onSearchChange={handleSearchChange} />

            <main className="max-w-4xl mx-auto px-4 py-10">
                <div className="flex mb-6">
                    <span className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${isDarkmodeActive ? "bg-indigo-500/20 text-indigo-400" : "bg-indigo-100 text-indigo-700"
                        }`}>
                        {capitalize(blog.category)}
                    </span>
                </div>

                <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
                    {capitalize(blog.title)}
                </h1>

                <div className="flex items-center gap-4 mb-8 opacity-70 text-sm md:text-base">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white text-xs">
                            {blog.user?.email.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium">{blog.user?.email}</span>
                    </div>
                    <span>•</span>
                    <span>{formatDate(blog.createdAt)}</span>
                </div>

                <div className="w-full mb-10 overflow-hidden rounded-2xl shadow-2xl">
                    <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-auto object-cover max-h-125"
                    />
                </div>

                <article className={`prose prose-lg max-w-none transition-colors ${isDarkmodeActive ? 'prose-invert text-gray-300' : 'text-gray-800'
                    }`}>
                    <p className="text-xl leading-relaxed whitespace-pre-wrap">
                        {blog.description}
                    </p>
                </article>
            </main>

            <Footer />
        </div>
    )
}

export default BlogDetails;