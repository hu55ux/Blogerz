import React, { useState } from 'react';
import api from '../utils/axios.js';
import { useTokens } from '../stores/tokenStore.js';
import NavbarSt from '../components/NavbarSt.jsx';
import Footer from '../components/Footer.jsx';
import { useDarkmode } from '../stores/darkmodeStore.js';
import DropDownMenu from '../components/DropDownMenu.jsx';

const CreateBlog = () => {
    const { accessToken, refreshToken, setAccessToken } = useTokens();
    const { isDarkmodeActive } = useDarkmode();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [imageTitle, setImageTitle] = useState("");

    const refreshTokens = async () => {
        try {
            const { data } = await api.post('/auth/refresh', { refreshToken });
            setAccessToken(data.accessToken);
            console.log('New access token obtained:', data.accessToken);
            console.log('Tokens refreshed successfully');
            return data.accessToken;
        } catch (error) {
            console.error('Failed to refresh tokens:', error.response?.data || error.message);
            return null;
        }
    };

    const handleSubmit = async () => {
        let token = accessToken;

        if (!token && refreshToken) {
            token = await refreshTokens();
        }

        if (!token) {
            alert("You need to log in to create a blog.");
            return;
        }

        const blogData = {
            title,
            description,
            category: selectedCategory,
            imageTitle
        };

        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            const { data } = await api.post("/blogs", blogData, config);
            console.log("Blog created successfully:", data);
            alert("Blog created successfully!");

            setTitle("");
            setDescription("");
            setSelectedCategory(null);
            setImageTitle("");
        } catch (error) {
            console.error("Error creating blog:", error.response?.data || error.message);
            alert("Failed to create blog");
        }
    };

    return (
        <div className={`w-full min-h-screen flex flex-col transition-all duration-500 ${isDarkmodeActive ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
            <NavbarSt />

            <div className="flex flex-col justify-center items-center grow gap-5">
                <h1 className='font-bold text-4xl md:text-6xl'>Write a Blog</h1>
                <div className={`relative w-195 max-w-360 flex flex-col gap-6 p-6 rounded-xl shadow-2xl transition-all duration-500 ${isDarkmodeActive ? 'bg-gray-800 shadow-gray-700' : 'bg-white shadow-gray-300'}`}>

                    <input
                        type="text"
                        placeholder="Blog Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={`w-full h-14 px-4 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-500 ${isDarkmodeActive ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-cyan-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-indigo-400'}`}
                    />

                    <DropDownMenu
                        isDarkmodeActive={isDarkmodeActive}
                        value={selectedCategory || "Select category"}
                        onChange={setSelectedCategory}
                    />

                    <input
                        type="text"
                        placeholder="Image Title"
                        value={imageTitle}
                        onChange={(e) => setImageTitle(e.target.value)}
                        className={`w-full h-14 px-4 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-500 ${isDarkmodeActive ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-cyan-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-indigo-400'}`}
                    />

                    <textarea
                        placeholder="Blog Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={`w-full px-4 py-2 rounded-lg border resize-none h-32 focus:outline-none focus:ring-2 transition-all duration-500 ${isDarkmodeActive ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-cyan-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-indigo-400'}`}
                    />

                    <button
                        onClick={handleSubmit}
                        className={`w-full py-3 rounded-lg font-semibold text-lg transition-all duration-300 ${isDarkmodeActive ? 'bg-cyan-500 hover:bg-cyan-400 text-gray-900' : 'bg-indigo-500 hover:bg-indigo-600 text-white'}`}
                    >
                        Create Blog
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default CreateBlog;
