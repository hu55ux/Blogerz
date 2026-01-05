import React, { useEffect, useState } from 'react';
import NavbarSt from '../components/NavbarSt.jsx';
import api from '../utils/axios.js';
import CardL from '../components/CardL.jsx';
import CardS from '../components/CardS.jsx';
import Footer from '../components/Footer.jsx';
import { useDarkmode } from '../stores/darkmodeStore.js';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [allBlogs, setAllBlogs] = useState([]); // Bütün datanı saxlamaq üçün
    const { isDarkmodeActive } = useDarkmode();
    const [productLimit, setProductLimit] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");

    const getProducts = async (search = "") => {
        try {
            // Hər dəfə API çağırmaq əvəzinə, datanı bir dəfə çəkib filtrasiya edirik
            const url = `/blogs?page=1&limit=100`;
            const { data } = await api.get(url);

            let filtered = data.blogs.filter(
                blog => blog.image && blog.image.trim() !== ''
            );

            if (search.length > 2) {
                filtered = filtered.filter(blog =>
                    blog.title.toLowerCase().includes(search.toLowerCase())
                );
            }

            setAllBlogs(filtered);
            setBlogs(filtered.slice(0, productLimit));
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };

    const handleSearchChange = (value) => {
        setSearchTerm(value);
        getProducts(value);
    }

    // ProductLimit dəyişəndə siyahını yenilə
    useEffect(() => {
        setBlogs(allBlogs.slice(0, productLimit));
    }, [productLimit, allBlogs]);

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className={`w-full min-h-screen transition-all duration-500 ${isDarkmodeActive ? 'bg-gray-900' : 'bg-white'
            }`}>
            <NavbarSt searchTerm={searchTerm} onSearchChange={handleSearchChange} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {blogs.length > 0 && (
                    <div className="mb-12">
                        <CardL blog={blogs[0]} />
                    </div>
                )}

                <div className="w-full flex flex-col items-center pt-5 pb-15">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                        {blogs.slice(1).map((blog) => (
                            <CardS key={blog._id} blog={blog} />
                        ))}
                    </div>

                    {allBlogs.length > blogs.length && (
                        <button
                            onClick={() => setProductLimit(prev => prev + 6)}
                            className={`mt-12 px-10 py-3 rounded-xl font-semibold text-lg transition-all duration-300 transform active:scale-95 ${isDarkmodeActive
                                ? 'bg-gray-800 text-gray-100 hover:bg-gray-700 border border-gray-700 shadow-xl'
                                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200'
                                }`}
                        >
                            Load More
                        </button>
                    )}

                    {blogs.length === 0 && !searchTerm && (
                        <div className="py-20 text-center opacity-50">Loading blogs...</div>
                    )}

                    {blogs.length === 0 && searchTerm && (
                        <div className="py-20 text-center opacity-50">No blogs found for "{searchTerm}"</div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default Blogs;