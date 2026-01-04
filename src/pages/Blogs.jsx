import React, { useEffect, useState } from 'react';
import NavbarSt from '../components/NavbarSt.jsx';
import api from '../utils/axios.js';
import CardL from '../components/CardL.jsx';
import CardS from '../components/CardS.jsx';
import Footer from '../components/Footer.jsx';
import { useTokens } from '../stores/tokenStore.js';
import { useDarkmode } from '../stores/darkmodeStore.js';


const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const { isDarkmodeActive } = useDarkmode();
    const { accessToken, refreshToken } = useTokens();
    let productLimit = 10;

    const deleteBlog = async (blogId) => {
        try {
            if (!blogId) return;

            if (!window.confirm("Are you sure you want to delete this blog?")) return;

            const url = `/blogs/${blogId}`;
            const headers = {
                "Content-Type": "application/json",
            };

            await api.delete(url, { headers });
            console.log("Blog deleted successfully");
            alert("Blog deleted successfully!");

            getProducts();
        } catch (error) {
            console.error(error.response?.data || error.message);
            alert("Failed to delete the blog. Please try again.");
        }
    };




    const getProducts = async () => {
        try {
            const url = `/blogs?page=1&limit=100`;
            const { data } = await api.get(url);
            console.log(data);

            const blogsWithImage = data.blogs.filter(
                blog => blog.image && blog.image.trim() !== '' && blog.image !== null && blog.image.length > 1
            );

            if (blogsWithImage.length >= productLimit) {
                setBlogs(blogsWithImage.slice(0, productLimit));
            } else {
                console.log("Enough blogs with images not found. Rendering skipped.");
                setBlogs([]);
            }
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };



    useEffect(() => {
        getProducts();
        deleteBlog('694317719f6894f5767f56b0');
    }, []);

    return (
        <div
            className={`w-full min-h-screen flex items-center transition-all duration-500 ${isDarkmodeActive ? 'bg-gray-900' : 'bg-white'
                }`}
        >
            <div className='w-full max-w-360 mx-auto'>
                <div className=''>
                    <NavbarSt />
                </div>
                <div>
                    <CardL blog={blogs[5]} />
                </div>
                <div className='w-full flex flex-col items-center pt-10 pb-15'>
                    <div className='w-304 grid grid-cols-3 gap-2 gap-y-1'>
                        {blogs.slice(1).map((blog) => (
                            <CardS key={blog._id} blog={blog} />
                        ))}
                    </div>
                    <button
                        onClick={() => {
                            productLimit += 6;
                            getProducts();
                        }}
                        className={`w-full max-w-48 h-12 rounded-lg font-semibold text-lg transition-all duration-300
                                    flex justify-center items-center
                                ${isDarkmodeActive
                                ? 'bg-gray-700 text-gray-100 hover:bg-gray-600 hover:shadow-lg shadow-gray-800'
                                : 'bg-indigo-500 text-white hover:bg-indigo-600 hover:shadow-lg shadow-indigo-400'
                            }`}
                    >
                        Load More
                    </button>

                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </div >
    )
}

export default Blogs