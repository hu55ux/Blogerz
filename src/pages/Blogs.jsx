import React, { useEffect, useState } from 'react';
import NavbarSt from '../components/NavbarSt.jsx';
import api from '../utils/axios.js';
import CardL from '../components/CardL.jsx';
import CardS from '../components/CardS.jsx';
import Footer from '../components/Footer.jsx';
import { useDarkmode } from '../stores/darkmodeStore.js';


const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const { isDarkmodeActive } = useDarkmode();
    const [productLimit, setProductLimit] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");


    const getProducts = async (search = "") => {
        try {
            const url = `/blogs?page=1&limit=100`;
            const { data } = await api.get(url);

            let blogsWithImage = data.blogs.filter(
                blog => blog.image && blog.image.trim() !== '' && blog.image.length > 1
            );

            if (search.length > 2) {
                blogsWithImage = blogsWithImage.filter(blog =>
                    blog.title.toLowerCase().includes(search.toLowerCase())
                );
            }

            setBlogs(blogsWithImage.slice(0, productLimit));
            console.log(blogsWithImage);
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };

    const handleSearchChange = (value) => {
        setSearchTerm(value);
        getProducts(value);
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div
            className={`w-full min-h-screen overflow-hidden flex items-center transition-all duration-500 ${isDarkmodeActive ? 'bg-gray-900' : 'bg-white'
                }`}
        >
            <div className='w-full max-w-360 mx-auto'>
                <div className=''>
                    <NavbarSt searchTerm={searchTerm} onSearchChange={handleSearchChange} />
                </div>
                <div>
                    <CardL blog={blogs[0]} />
                </div>
                <div className='w-full flex flex-col items-center pt-10 pb-15'>
                    <div className='w-304 grid grid-cols-3 gap-2 gap-y-1'>
                        {blogs.slice(1).map((blog) => (
                            <CardS key={blog._id} blog={blog} />
                        ))}
                    </div>
                    <button
                        onClick={() => {
                            setProductLimit(prev => prev + 6);
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