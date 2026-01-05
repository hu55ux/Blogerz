import React, { useState } from 'react'
import Union from '../assets/Union.svg'
import UnionWhite from '../assets/Union-White.svg'
import Light from '../assets/Light.svg'
import Night from '../assets/Night.svg'
import SearchBlack from '../assets/SearchBlack.svg'
import SearchWhite from '../assets/SearchWhite.svg'
import { useDarkmode } from '../stores/darkmodeStore'
import { useNavigate } from "react-router-dom"
import api from '../utils/axios.js'
import { useTokens } from '../stores/tokenStore.js'

const NavbarSt = ({ searchTerm, onSearchChange }) => {
    const { isDarkmodeActive, toggleDarkmode } = useDarkmode()
    const navigate = useNavigate();
    const { accessToken, refreshToken, setAccessToken } = useTokens();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const refreshTokens = async () => {
        try {
            const data = await api.post('/auth/refresh', { refreshToken });
            setAccessToken(data.accessToken);
            return data.accessToken;
        } catch (error) {
            console.error('Failed to refresh tokens:', error.response?.data || error.message);
            return null;
        }
    }

    const handleSignIn = async () => {
        if (accessToken) {
            alert('You are already logged in.');
            return;
        }
        if (!accessToken && refreshToken) {
            const newAccessToken = await refreshTokens();
            if (newAccessToken) {
                alert('You are already logged in.');
                return;
            }
        }
        navigate('/login');
        setIsMenuOpen(false);
    }

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Write a Blog', path: '/create', auth: true },
        { name: 'My Blogs', path: '/author', auth: true },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className={`w-full sticky top-0 z-50 transition-all duration-500 border-b ${isDarkmodeActive ? 'bg-gray-900 border-gray-800 shadow-lg' : 'bg-white border-gray-100 shadow-sm'
            }`}>
            <div className="max-w-7xl mx-auto mb-15 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20 gap-4">

                    <div className="flex items-center cursor-pointer shrink-0" onClick={() => navigate('/')}>
                        <img src={isDarkmodeActive ? UnionWhite : Union} alt="Logo" className="w-8 h-8 mr-2" />
                        <span className={`text-xl font-medium hidden sm:block ${isDarkmodeActive ? 'text-white' : 'text-gray-900'}`}>
                            Meta<span className="font-bold">Blog</span>
                        </span>
                    </div>

                    <div className="hidden lg:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => {
                                    if (link.auth && !accessToken) {
                                        alert("Please log in.");
                                        return;
                                    }
                                    navigate(link.path);
                                }}
                                className={`text-sm font-medium transition-colors hover:text-cyan-500 ${isDarkmodeActive ? 'text-gray-300' : 'text-gray-600'
                                    }`}
                            >
                                {link.name}
                            </button>
                        ))}
                    </div>

                    <div className="relative flex-1 max-w-xs ml-auto">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className={`w-full h-10 pl-4 pr-10 rounded-xl border transition-all text-sm focus:ring-2 focus:outline-none ${isDarkmodeActive
                                ? 'bg-gray-800 border-gray-700 text-gray-100 focus:ring-cyan-500 placeholder-gray-500'
                                : 'bg-gray-100 border-transparent text-gray-900 focus:ring-cyan-400 placeholder-gray-400'
                                }`}
                        />
                        <img
                            src={isDarkmodeActive ? SearchWhite : SearchBlack}
                            alt="Search"
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50"
                        />
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                        <button
                            onClick={toggleDarkmode}
                            className={`p-2 rounded-xl transition-all ${isDarkmodeActive ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                                }`}
                        >
                            <img src={isDarkmodeActive ? Night : Light} alt="Theme" className="w-5 h-5" />
                        </button>

                        <button
                            onClick={handleSignIn}
                            className={`hidden sm:block px-5 py-2 rounded-xl text-sm font-semibold transition-all ${isDarkmodeActive
                                ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700'
                                : 'bg-cyan-500 text-white hover:bg-cyan-600 shadow-md shadow-cyan-200'
                                }`}
                        >
                            Sign In
                        </button>

                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2">
                            <div className={`w-6 h-0.5 mb-1.5 transition-all ${isDarkmodeActive ? 'bg-white' : 'bg-gray-900'} ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
                            <div className={`w-6 h-0.5 mb-1.5 ${isDarkmodeActive ? 'bg-white' : 'bg-gray-900'} ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                            <div className={`w-6 h-0.5 ${isDarkmodeActive ? 'bg-white' : 'bg-gray-900'} ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
                        </button>
                    </div>
                </div>
            </div>

            <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-125 border-t border-gray-100/10' : 'max-h-0'}`}>
                <div className={`px-4 py-6 space-y-4 ${isDarkmodeActive ? 'bg-gray-900' : 'bg-white'}`}>
                    {navLinks.map((link) => (
                        <button
                            key={link.name}
                            onClick={() => {
                                if (link.auth && !accessToken) {
                                    alert("Please log in.");
                                    return;
                                }
                                navigate(link.path);
                                setIsMenuOpen(false);
                            }}
                            className={`block w-full text-left p-3 rounded-xl font-medium ${isDarkmodeActive ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            {link.name}
                        </button>
                    ))}
                    <button
                        onClick={handleSignIn}
                        className="w-full p-4 rounded-xl bg-cyan-500 text-white font-bold"
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default NavbarSt;