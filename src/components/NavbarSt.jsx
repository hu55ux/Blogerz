import React from 'react'
import Union from '../assets/Union.svg'
import UnionWhite from '../assets/Union-White.svg'
import Light from '../assets/Light.svg'
import Night from '../assets/Night.svg'
import SearchBlack from '../assets/SearchBlack.svg'
import SearchWhite from '../assets/SearchWhite.svg'
import { useDarkmode } from '../stores/darkmodeStore'
import { useNavigate } from "react-router-dom"


const NavbarSt = () => {
    const { isDarkmodeActive, toggleDarkmode } = useDarkmode()
    // const navigate = useNavigate()

    return (
        <div
            className={`w-full h-81 flex flex-col items-center justify-start px-4 transition-colors duration-500
        ${isDarkmodeActive ? 'bg-gray-900' : 'bg-white'}`}
        >
            <div
                className={`w-300 h-9 py-8 font-light flex items-center rounded-md text-lg transition-colors duration-500
          ${isDarkmodeActive ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}
            >
                <button onClick={() => navigate('/')}
                    className={`font-medium transition-all duration-300 hover:-translate-y-0.5
    ${isDarkmodeActive
                            ? 'text-gray-200 hover:text-indigo-400'
                            : 'text-gray-700 hover:text-indigo-500'
                        }`}
                >
                    <div
                        className={`pl-2 pr-10 flex items-center border-r-2 mr-6 transition-colors duration-500
      ${isDarkmodeActive ? 'border-gray-600' : 'border-gray-300'}`}
                    >
                        <img src={isDarkmodeActive ? UnionWhite : Union} alt="Union Logo" className="w-6 h-6 mr-2" />
                        Meta <span className="font-bold">Blog</span>
                    </div>
                </button>
                <div className="flex ml-auto gap-15">
                    <button onClick={() => navigate('/')}
                        className={`font-medium transition-all duration-300 hover:-translate-y-0.5
      ${isDarkmodeActive
                                ? 'text-gray-200 hover:text-indigo-400'
                                : 'text-gray-700 hover:text-indigo-500'
                            }`}
                    >
                        Home
                    </button>

                    <button onClick={() => navigate('/writeBlog')}
                        className={`font-medium transition-all duration-300 hover:-translate-y-0.5
      ${isDarkmodeActive
                                ? 'text-gray-200 hover:text-indigo-400'
                                : 'text-gray-700 hover:text-indigo-500'
                            }`}
                    >
                        Write a Blog
                    </button>
                    <button onClick={() => navigate('/myBlogs')}
                        className={`font-medium transition-all duration-300 hover:-translate-y-0.5
      ${isDarkmodeActive
                                ? 'text-gray-200 hover:text-indigo-400'
                                : 'text-gray-700 hover:text-indigo-500'
                            }`}
                    >
                        My Blogs
                    </button>

                    <button
                        className={`font-medium transition-all duration-300 hover:-translate-y-0.5
                            ${isDarkmodeActive
                                ? 'text-gray-200 hover:text-indigo-400'
                                : 'text-gray-700 hover:text-indigo-500'
                            }`}
                    >
                        Contact
                    </button>
                </div>
                <div className="relative w-50 ml-10">
                    <input
                        type="text"
                        placeholder="Type something..."
                        className={`
                                w-full h-9 pl-3 pr-10 rounded-lg border border-gray-300 
                                focus:outline-none focus:ring-2 focus:ring-indigo-500
                                transition-all duration-500 placeholder-gray-400
                            ${isDarkmodeActive
                                ? 'bg-gray-800 text-gray-100 border-gray-600 placeholder-gray-500 focus:ring-indigo-400'
                                : 'bg-white text-gray-900 border-gray-300 placeholder-gray-400 focus:ring-indigo-500'
                            }
                    `}
                    />
                    <img
                        src={isDarkmodeActive ? SearchWhite : SearchBlack}
                        alt="Search Icon"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
                    />
                </div>

                <div className="ml-5 flex items-center gap-2 pr-10">
                    <button
                        onClick={toggleDarkmode}
                        className={`rounded-2xl w-9 h-8 flex justify-center items-center
                                    transition-all duration-500
                            ${isDarkmodeActive
                                ? 'bg-gray-700 hover:bg-gray-600 shadow-md shadow-gray-900 hover:shadow-lg hover:shadow-black'
                                : 'bg-gray-300 hover:bg-gray-400 shadow-md shadow-gray-600 hover:shadow-lg hover:shadow-gray-700'
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
                <button
                    className={`w-25 h-9 px-4 rounded-lg transition-all duration-300 shadow-md
                        ${isDarkmodeActive
                            ? 'bg-gray-700 text-gray-100 hover:bg-gray-600 hover:scale-105 hover:shadow-lg'
                            : 'bg-indigo-500 text-white hover:bg-indigo-600 hover:scale-105 hover:shadow-lg'
                        }
                    `}
                >
                    Sign In
                </button>

            </div>
        </div>
    )
}

export default NavbarSt
