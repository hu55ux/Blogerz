import React, { useState } from 'react'
import Union from '../assets/Union.svg'
import UnionWhite from '../assets/Union-White.svg'
import Light from '../assets/Light.svg'
import Night from '../assets/Night.svg'
import { useDarkmode } from '../stores/darkmodeStore'
import { useNavigate } from "react-router-dom"
import { useTokens } from '../stores/tokenStore.js'

const NavbarLog = () => {
    const { accessToken } = useTokens()
    const { isDarkmodeActive, toggleDarkmode } = useDarkmode()
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Write a Blog', path: '/create', auth: true },
        { name: 'My Blogs', path: '/author', auth: true },
        { name: 'Contact', path: '/contact', auth: false },
    ];

    const handleNavigation = (path, requiresAuth) => {
        if (requiresAuth && !accessToken) {
            alert(`You need to log in to access this page.`);
            return;
        }
        navigate(path);
        setIsMenuOpen(false);
    };

    return (
        <nav className={`w-full sticky top-0 z-50 transition-all duration-500 border-b ${isDarkmodeActive ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'
            }`}>
            <div className="max-w-7xl mx-auto mb-15 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
                        <img
                            src={isDarkmodeActive ? UnionWhite : Union}
                            alt="Logo"
                            className="w-8 h-8 mr-2"
                        />
                        <span className={`text-xl font-medium ${isDarkmodeActive ? 'text-white' : 'text-gray-900'}`}>
                            Meta <span className="font-bold">Blog</span>
                        </span>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => handleNavigation(link.path, link.auth)}
                                className={`font-medium transition-all duration-300 hover:-translate-y-0.5 ${isDarkmodeActive ? 'text-gray-300 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-600'
                                    }`}
                            >
                                {link.name}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleDarkmode}
                            className={`p-2 rounded-xl transition-all duration-500 ${isDarkmodeActive ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-600'
                                }`}
                        >
                            <img
                                src={isDarkmodeActive ? Night : Light}
                                alt="theme icon"
                                className="w-5 h-5"
                            />
                        </button>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2"
                        >
                            <div className={`w-6 h-0.5 mb-1.5 transition-all ${isDarkmodeActive ? 'bg-white' : 'bg-gray-900'} ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
                            <div className={`w-6 h-0.5 mb-1.5 ${isDarkmodeActive ? 'bg-white' : 'bg-gray-900'} ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                            <div className={`w-6 h-0.5 ${isDarkmodeActive ? 'bg-white' : 'bg-gray-900'} ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
                        </button>
                    </div>
                </div>
            </div>

            <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-64 border-t border-gray-100/10' : 'max-h-0'}`}>
                <div className={`px-4 pt-2 pb-6 space-y-2 ${isDarkmodeActive ? 'bg-gray-900' : 'bg-white'}`}>
                    {navLinks.map((link) => (
                        <button
                            key={link.name}
                            onClick={() => handleNavigation(link.path, link.auth)}
                            className={`block w-full text-left px-3 py-3 rounded-lg font-medium ${isDarkmodeActive ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            {link.name}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    )
}

export default NavbarLog