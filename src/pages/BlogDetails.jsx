import React, { useState, useEffect } from 'react';
import NavbarSt from '../components/NavbarSt.jsx';
import api from '../utils/axios.js';
import { useDarkmode } from '../stores/darkmodeStore.js';
import Footer from '../components/Footer.jsx';
import { useParams } from 'react-router-dom';


const BlogDetails = () => {
    const [blog, setBlog] = useState([]);
    const [productLimit, setProductLimit] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const { isDarkmodeActive } = useDarkmode();
    const { blogId } = useParams();


    const getProductById = async (search = "") => {
        try {
            
        } catch (error) {
            
        }
    };

    const handleSearchChange = (value) => {
        setSearchTerm(value);
        getProducts(value);
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

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className={`w-full min-h-screen flex flex-col transition-all duration-500 ${isDarkmodeActive ? 'bg-gray-900' : 'bg-white'
            }`}>
            <div className='max-w-360 w-full'>
                <NavbarSt searchTerm={searchTerm} onSearchChange={handleSearchChange} />
                <div className='grow w-full flex justify-center transition-all duration-500'>
                    <div className={`w-200 bg-gray-900 transition-all duration-500 ${isDarkmodeActive ? 'bg-gray-900' : 'bg-white'
                        }`}>
                        <h1
                            className={`w-30 h-10 ml-4 mt-5 mb-3 transition-all duration-500 flex justify-center items-center rounded-md text-lg font-medium ${isDarkmodeActive
                                ? "bg-gray-700 text-cyan-400"
                                : "bg-gray-200 text-cyan-800"
                                }`}
                        >
                            {capitalize(blogs[0]?.category)}
                        </h1>
                        <h1 className="ml-2 text-5xl font-semibold">
                            {capitalize(blogs[0]?.title)}
                        </h1>
                        <div className=" flex gap-5 ml-4 mt-auto mb-5 transition-all duration-500 text-md font-light">
                            <h1 className={isDarkmodeActive ? "text-gray-300" : "text-gray-700"}>
                                {blogs[0]?.user?.email || "—"}
                            </h1>
                            <h1 className={isDarkmodeActive ? "text-gray-300" : "text-gray-700"}>
                                {formatDate(blogs[0]?.createdAt)}
                            </h1>
                        </div>
                        <img src={blogs[0]?.image} alt={blogs[0]?.title} className='w-200 h-116 rounded-lg' />
                        <p className={`mt-5 mb-10 px-4 text-2xl leading-8 ${isDarkmodeActive ? 'text-gray-300' : 'text-gray-900'}`}>
                            {blogs[0]?.description}
                        </p>
                    </div>
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default BlogDetails