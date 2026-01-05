import React, { useState } from 'react';
import api from '../utils/axios.js';
import { useTokens } from '../stores/tokenStore.js';
import Footer from '../components/Footer.jsx';
import { useDarkmode } from '../stores/darkmodeStore.js';
import DropDownMenu from '../components/DropDownMenu.jsx';
import { useNavigate } from 'react-router-dom';
import NavbarLog from '../components/NavbarLog.jsx';

const CreateBlog = () => {
    const { accessToken, refreshToken, setAccessToken } = useTokens();
    const { isDarkmodeActive } = useDarkmode();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [imageTitle, setImageTitle] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const refreshTokens = async () => {
        try {
            const { data } = await api.post('/auth/refresh', { refreshToken });
            setAccessToken(data.accessToken);
            return data.accessToken;
        } catch (error) {
            console.error('Failed to refresh tokens:', error.message);
            return null;
        }
    };

    const handleSubmit = async () => {
        if (!title || !description || !selectedCategory || !imageTitle) {
            alert("Please fill in all fields.");
            return;
        }

        setIsLoading(true);
        let token = accessToken;

        if (!token && refreshToken) {
            token = await refreshTokens();
        }

        if (!token) {
            alert("You need to log in to create a blog.");
            setIsLoading(false);
            navigate('/login');
            return;
        }

        const blogData = {
            title,
            description,
            category: selectedCategory,
            image: imageTitle
        };

        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            await api.post("/blogs", blogData, config);
            alert("Blog created successfully!");
            navigate('/author');
        } catch (error) {
            console.error("Error creating blog:", error.response?.data || error.message);
            alert("Failed to create blog. Check console for details.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`w-full min-h-screen flex flex-col transition-all duration-500 ${isDarkmodeActive ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
            }`}>
            <NavbarLog />

            <main className="grow flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-2xl flex flex-col gap-8">

                    <div className="text-center space-y-2">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                            Write a <span className="text-indigo-500">Blog</span>
                        </h1>
                        <p className="opacity-60">Share your thoughts with the world</p>
                    </div>

                    <div className={`w-full flex flex-col gap-6 p-6 md:p-10 rounded-3xl shadow-2xl transition-all duration-500 border ${isDarkmodeActive
                        ? 'bg-gray-800 border-gray-700 shadow-gray-950/50'
                        : 'bg-white border-gray-100 shadow-indigo-100'
                        }`}>

                        <div className="space-y-2">
                            <label className="text-sm font-medium ml-1">Title</label>
                            <input
                                type="text"
                                placeholder="Enter an engaging title..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className={`w-full h-14 px-5 rounded-xl border focus:outline-none focus:ring-2 transition-all duration-300 ${isDarkmodeActive
                                    ? 'bg-gray-900/50 border-gray-700 focus:ring-cyan-500/50 placeholder-gray-600'
                                    : 'bg-gray-50 border-gray-200 focus:ring-indigo-500/30 placeholder-gray-400'
                                    }`}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium ml-1">Category</label>
                                <DropDownMenu
                                    isDarkmodeActive={isDarkmodeActive}
                                    value={selectedCategory || "Select category"}
                                    onChange={setSelectedCategory}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium ml-1">Image URL</label>
                                <input
                                    type="text"
                                    placeholder="https://..."
                                    value={imageTitle}
                                    onChange={(e) => setImageTitle(e.target.value)}
                                    className={`w-full h-14 px-5 rounded-xl border focus:outline-none focus:ring-2 transition-all duration-300 ${isDarkmodeActive
                                        ? 'bg-gray-900/50 border-gray-700 focus:ring-cyan-500/50 placeholder-gray-600'
                                        : 'bg-gray-50 border-gray-200 focus:ring-indigo-500/30 placeholder-gray-400'
                                        }`}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium ml-1">Content</label>
                            <textarea
                                placeholder="Tell your story..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className={`w-full px-5 py-4 rounded-xl border resize-none h-48 focus:outline-none focus:ring-2 transition-all duration-300 ${isDarkmodeActive
                                    ? 'bg-gray-900/50 border-gray-700 focus:ring-cyan-500/50 placeholder-gray-600'
                                    : 'bg-gray-50 border-gray-200 focus:ring-indigo-500/30 placeholder-gray-400'
                                    }`}
                            />
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className={`w-full py-4 mt-2 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${isDarkmodeActive
                                ? 'bg-cyan-500 hover:bg-cyan-400 text-gray-900 shadow-cyan-900/20'
                                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
                                }`}
                        >
                            {isLoading ? "Publishing..." : "Create Blog"}
                        </button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default CreateBlog;