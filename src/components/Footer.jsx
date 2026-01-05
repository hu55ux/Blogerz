import React, { useEffect, useState } from 'react';
import { useDarkmode } from '../stores/darkmodeStore';
import UnionWhite from '../assets/Union-White.svg'
import Union from '../assets/Union.svg'
import api from '../utils/axios';

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
        typeof text === "string"
            ? text.charAt(0).toUpperCase() + text.slice(1)
            : "";


    return (
        <div className={`w-full h-105 mt-10 pt-16 overflow-hidden transition-all duration-500  ${isDarkmodeActive ? 'bg-gray-900 text-gray-100' : 'bg-gray-200 text-gray-900'}`}>
            <div className='max-w-360 mx-auto px-35'>
                <div className='flex gap-16'>
                    <div className='w-70 h-59'>
                        <h1 className='text-lg font-bold pb-3'>About</h1>
                        <p className='font-light'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Nostrum, distinctio natus cum numquam ab commodi perspiciatis
                            dignissimos pariatur adipisci sint rem eos nisi dolorem? Unde.
                        </p>
                        <h1 className='pt-6'>
                            <span className='font-bold'>Email : </span> info@jstemplate.net
                        </h1>
                        <h1>
                            <span className='font-bold'>Phone : </span> +880 1234 56789
                        </h1>
                    </div>

                    <div className='flex flex-col items-start gap-2 ml-auto'>
                        <h1 className='text-lg font-bold pb-3'>Quick Link</h1>
                        <button className='font-light hover:text-indigo-500 transition-all duration-500'>Home</button>
                        <button className='font-light hover:text-indigo-500 transition-all duration-500'>Write a Blog</button>
                        <button className='font-light hover:text-indigo-500 transition-all duration-500'>My Blogs</button>
                        <button className='font-light hover:text-indigo-500 transition-all duration-500'>Contact</button>
                    </div>

                    <div className='flex flex-col items-start gap-2'>
                        <h1 className='text-lg font-bold pb-3'>Categories</h1>
                        {categories.length > 0 ? (
                            categories.map((cat, i) => (
                                <span
                                    key={i}
                                    className={`px-3 py-0.5 transition-all duration-500 text-sm font-light ${isDarkmodeActive ? 'text-white' : ''
                                        }`}
                                >
                                    {capitalize(cat)}
                                </span>
                            ))
                        ) : (
                            <p className='font-light'>No categories available.</p>
                        )}
                    </div>
                </div>
                <hr
                    className={`w-full transition-all duration-500 mt-5 mb-2 border-0 h-px
                                ${isDarkmodeActive ? 'bg-gray-700' : 'bg-gray-300'}`}
                />

                <div className='flex items-center '>

                    <div className="flex items-center gap-2 transition-all duration-500">
                        <div>
                            <img
                                className="w-12 h-12 transition-all duration-500"
                                src={isDarkmodeActive ? UnionWhite : Union}
                                alt="Logo"
                            />
                        </div>

                        <div className="leading-tight transition-all duration-500">
                            <div
                                className={`text-lg font-semibold transition-all duration-500
                                ${isDarkmodeActive ? 'text-gray-100' : 'text-gray-900'}`}
                            >
                                Meta<span className="font-bold">Blog</span>
                            </div>

                            <div
                                className={`text-sm transition-all duration-500 ${isDarkmodeActive ? 'text-gray-400' : 'text-gray-600'}`}
                            >
                                © JS Template 2023. All Rights Reserved.
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2 ml-auto">
                        <h1
                            className={`px-2 border-r last:border-r-0
                                        ${isDarkmodeActive ? 'border-gray-600 text-gray-300' : 'border-gray-400 text-gray-700'}`}
                        >
                            Terms of Use
                        </h1>

                        <h1
                            className={`px-2 border-r last:border-r-0
                                        ${isDarkmodeActive ? 'border-gray-600 text-gray-300' : 'border-gray-400 text-gray-700'}`}
                        >
                            Privacy Policy
                        </h1>

                        <h1
                            className={`${isDarkmodeActive ? 'text-gray-300' : 'text-gray-700'}`}
                        >
                            Cookie Policy
                        </h1>
                    </div>

                </div>


            </div>
        </div>
    );
};

export default Footer;
