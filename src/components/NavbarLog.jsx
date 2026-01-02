import React from 'react'
import Union from '../assets/Union.svg'
import UnionWhite from '../assets/Union-White.svg'
import Light from '../assets/Light.svg'
import Night from '../assets/Night.svg'
import { useDarkmode } from '../stores/darkmodeStore'
import { useNavigate } from "react-router-dom"

const NavbarLog = () => {
    const { isDarkmodeActive, toggleDarkmode } = useDarkmode()
    // const navigate = useNavigate()

    return (
        <div className={`w-full h-81 py-5 flex flex-col items-center px-4 transition-all duration-500
            ${isDarkmodeActive ? 'bg-gray-900' : 'bg-white'}`}>

            <div
                className='w-full flex justify-center max-w-360 mx-auto px-28'
            >
                <div
                    className={`w-200 h-9 font-light flex items-center rounded-md text-lg transition-all duration-500
                    ${isDarkmodeActive ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}
                >
                    <button onClick={() => navigate('/')}
                        className={`font-medium transition-all duration-500 hover:-translate-y-0.5
                        ${isDarkmodeActive
                                ? 'text-gray-200 hover:text-indigo-400'
                                : 'text-gray-700 hover:text-indigo-500'
                            }`}
                    >
                        <div
                            className={`pl-2 pr-10 flex items-center border-r-2 mr-6 transition-all duration-500
                            ${isDarkmodeActive ? 'border-gray-600' : 'border-gray-500'}`}
                        >
                            <img src={isDarkmodeActive ? UnionWhite : Union} alt="Union Logo" className="w-6 h-6 mr-2" />
                            Meta <span className="font-bold">Blog</span>
                        </div>
                    </button>
                    <div className="flex gap-10">
                        <button onClick={() => navigate('/')}
                            className={`font-medium transition-all duration-500 hover:-translate-y-0.5
                            ${isDarkmodeActive
                                    ? 'text-gray-200 hover:text-indigo-400'
                                    : 'text-gray-700 hover:text-indigo-500'
                                }`}
                        >
                            Home
                        </button>
                        <button onClick={() => navigate('/writeBlog')}
                            className={`font-medium transition-all duration-500 hover:-translate-y-0.5
                            ${isDarkmodeActive
                                    ? 'text-gray-200 hover:text-indigo-400'
                                    : 'text-gray-700 hover:text-indigo-500'
                                }`}
                        >
                            Write a Blog
                        </button>
                        <button onClick={() => navigate('/myBlogs')}
                            className={`font-medium transition-all duration-500 hover:-translate-y-0.5
                            ${isDarkmodeActive
                                    ? 'text-gray-200 hover:text-indigo-400'
                                    : 'text-gray-700 hover:text-indigo-500'
                                }`}
                        >
                            My Blogs
                        </button>
                        <button
                            className={`font-medium transition-all duration-500 hover:-translate-y-0.5
                            ${isDarkmodeActive
                                    ? 'text-gray-200 hover:text-indigo-400'
                                    : 'text-gray-700 hover:text-indigo-500'
                                }`}
                        >
                            Contact
                        </button>
                    </div>
                    <div className="ml-auto flex items-center gap-2 pr-10">
                        <button
                            onClick={toggleDarkmode}
                            className={`rounded-2xl w-9 h-8 flex justify-center items-center
                            transition-all duration-500 
                            ${isDarkmodeActive
                                    ? 'bg-gray-700 hover:bg-gray-600 shadow-md shadow-gray-900 hover:shadow-lg hover:shadow-black'
                                    : 'bg-gray-500 hover:bg-gray-400 shadow-md shadow-gray-600 hover:shadow-lg hover:shadow-gray-700'
                                }`}
                        >
                            <img
                                src={isDarkmodeActive ? Night : Light}
                                alt="theme icon"
                                className={`w-5 h-5 transition-all duration-500
                                ${isDarkmodeActive
                                        ? 'rotate-180 scale-110 opacity-100'
                                        : 'rotate-0 scale-100 opacity-90'
                                    }`}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavbarLog
