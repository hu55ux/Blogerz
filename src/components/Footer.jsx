import React, { useEffect, useState } from 'react';
import { useDarkmode } from '../stores/darkmodeStore';
import UnionWhite from '../assets/Union-White.svg'
import Union from '../assets/Union.svg'
import api from '../utils/axios';
import { Link } from 'react-router-dom';

const Footer = () => {
    const [categories, setCategories] = useState([]);
    const { isDarkmodeActive } = useDarkmode();

    const getCategories = async () => {
        try {
            const { data, statusText } = await api.get('/blogs/categories');
            if (statusText === 'OK') {
                setCategories(data);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    const capitalize = (text = "") =>
        typeof text === "string" ? text.charAt(0).toUpperCase() + text.slice(1) : "";

    return (
        <footer className={`w-full mt-10 pt-12 md:pt-16 pb-8 transition-all duration-500 ${isDarkmodeActive ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'
            }`}>
            <div className='max-w-7xl mx-auto px-6 md:px-12'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16'>

                    <div className='lg:col-span-1'>
                        <h1 className='text-lg font-bold mb-4'>About</h1>
                        <p className={`font-light leading-relaxed ${isDarkmodeActive ? 'text-gray-400' : 'text-gray-600'}`}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Nostrum, distinctio natus cum numquam ab commodi perspiciatis.
                        </p>
                        <div className='mt-6 space-y-1'>
                            <p><span className='font-bold'>Email :</span> info@jstemplate.net</p>
                            <p><span className='font-bold'>Phone :</span> +880 1234 56789</p>
                        </div>
                    </div>

                    <div className='flex flex-col items-start gap-3'>
                        <h1 className='text-lg font-bold mb-1'>Quick Links</h1>
                        {['Home', 'Write a Blog', 'My Blogs', 'Contact'].map((item) => (
                            <button key={item} className='font-light hover:text-cyan-500 transition-colors duration-300'>
                                {item}
                            </button>
                        ))}
                    </div>

                    <div className='flex flex-col items-start gap-3'>
                        <h1 className='text-lg font-bold mb-1'>Categories</h1>
                        <div className='flex flex-wrap gap-2'>
                            {categories.length > 0 ? (
                                categories.slice(0, 6).map((cat, i) => (
                                    <span key={i} className={`text-sm font-light hover:text-cyan-500 cursor-pointer ${isDarkmodeActive ? 'text-gray-400' : 'text-gray-600'
                                        }`}>
                                        {capitalize(cat)}
                                    </span>
                                ))
                            ) : (
                                <p className='text-sm font-light'>No categories available.</p>
                            )}
                        </div>
                    </div>
                </div>

                <hr className={`w-full my-10 border-0 h-px ${isDarkmodeActive ? 'bg-gray-800' : 'bg-gray-300'
                    }`} />

                <div className='flex flex-col md:flex-row items-center justify-between gap-8'>

                    <div className="flex items-center gap-3">
                        <img
                            className="w-10 h-10"
                            src={isDarkmodeActive ? UnionWhite : Union}
                            alt="Logo"
                        />
                        <div className="leading-tight">
                            <div className="text-xl font-semibold">
                                Meta<span className="font-bold text-cyan-500">Blog</span>
                            </div>
                            <div className={`text-xs mt-1 ${isDarkmodeActive ? 'text-gray-500' : 'text-gray-500'}`}>
                                © JS Template 2023. All Rights Reserved.
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
                        {['Terms of Use', 'Privacy Policy', 'Cookie Policy'].map((text, idx) => (
                            <button
                                key={text}
                                className={`hover:text-cyan-500 transition-colors ${isDarkmodeActive ? 'text-gray-400' : 'text-gray-600'
                                    } ${idx !== 2 ? 'md:border-r md:pr-6 border-gray-700/20' : ''}`}
                            >
                                {text}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;