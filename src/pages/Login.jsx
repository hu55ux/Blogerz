import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import NavbarLog from '../components/NavbarLog.jsx'
import { useDarkmode } from '../stores/darkmodeStore';
import { useTokens } from '../stores/tokenStore';
import Footer from '../components/Footer.jsx';

const Login = () => {
    const { isDarkmodeActive } = useDarkmode();
    const { accessToken, refreshToken, setAccesToken, setRefreshToken } = useTokens();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");

    const showMessage = (messageText) => {
        setMessage(messageText);
        setTimeout(() => {
            setMessage("");
        }, 2500);
    }

    const handleInputChange = (title, value) => {
        setFormData(prevState => ({
            ...prevState,
            [title]: value
        }))
    }

    const handleRegister = async () => {
        if (accessToken && refreshToken) {
            showMessage("You are already logged in!");
            return;
        }
        if (!accessToken && refreshToken) {
            const refreshed = await refreshTokens();
            if (refreshed) {
                showMessage("You are already logged in!");
                return;
            }
        }
        navigate("/register");
    };


    const refreshTokens = async () => {
        try {
            const { data, status } = await axios.post(
                "https://ilkinibadov.com/api/b/auth/refresh",
                { refreshToken },
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (status === 200 && data?.accessToken) {
                setAccesToken(data.accessToken);
                setRefreshToken(data.refreshToken);
                return true;
            }

            return false;
        } catch (error) {
            console.error("Refresh failed", error);
            return false;
        }
    };

    const handleLogin = async () => {
        try {
            const { data, statusText } = await axios.post("https://ilkinibadov.com/api/b/auth/login", formData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if (statusText === "OK") {
                console.log(data);
                setAccesToken(data.accessToken);
                setRefreshToken(data.refreshToken);
            }
        } catch (error) {

        }
    }
    return (
        <div className='relative'>
            {message && (
                <div
                    className={`fixed top-6 right-6 px-5 py-3 rounded-lg shadow-lg z-50
                                transition-all duration-500
                            ${isDarkmodeActive
                            ? 'bg-gray-800 text-white'
                            : 'bg-white text-gray-900'
                        }`}
                >
                    {message}
                </div>
            )}


            <div className={`w-full min-h-screen flex flex-col transition-all duration-500  ${isDarkmodeActive ? 'bg-gray-900 text-gray-100' : ' text-gray-900'}`}>
                <div className='w-full max-w-360 mx-auto flex flex-col grow'>
                    <NavbarLog />
                    <div className='h-18 font-bold transition-all duration-500 text-6xl flex justify-center'>Login</div>
                    <div
                        className={`w-full h-190 flex items-center justify-center transition-all duration-500
                        ${isDarkmodeActive ? 'bg-gray-900' : 'bg-white'}`}
                    >
                        <div
                            className={`w-200 h-85 border flex flex-col gap-6 justify-start transition-all duration-500
                            ${isDarkmodeActive
                                    ? 'bg-gray-800 border-gray-700 '
                                    : 'bg-white border-gray-200 '
                                }`}
                        >
                            <input
                                value={formData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                type="email"
                                placeholder="Enter your email"
                                className={`w-full h-19 px-4 text-sm
                                focus:outline-none focus:ring-2 transition-all duration-500
                                ${isDarkmodeActive
                                        ? 'bg-gray-700 text-gray-100 placeholder-gray-400 focus:ring-indigo-400'
                                        : 'bg-gray-100 text-gray-900 placeholder-gray-500 focus:ring-indigo-500'
                                    } `}
                            />

                            <input
                                value={formData.password}
                                onChange={(e) => handleInputChange("password", e.target.value)}
                                type="password"
                                placeholder="Enter your password"
                                className={`w-full h-19 px-4 text-sm transition-all duration-500
                                focus:outline-none focus:ring-2
                                ${isDarkmodeActive
                                        ? 'bg-gray-700 text-gray-100 placeholder-gray-400 focus:ring-indigo-400'
                                        : 'bg-gray-100 text-gray-900 placeholder-gray-500 focus:ring-indigo-500'
                                    }`}
                            />

                            <button
                                onClick={handleRegister}
                                className="text-indigo-500 text-sm text-left hover:underline transition-all duration-500"
                            >
                                Don’t have an account?
                            </button>

                            <button
                                onClick={handleLogin}
                                className={`w-full h-25 mt-auto font-semibold text-lg transition-all duration-500
                                ${isDarkmodeActive
                                        ? 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-md shadow-indigo-900/40'
                                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md'
                                    }`}
                            >
                                Login
                            </button>
                        </div>
                    </div>
                    <div className='mt-auto'>
                        <Footer />
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Login