import React, { useState } from 'react';
import axios from 'axios';
import NavbarLog from '../components/NavbarLog.jsx';
import { useDarkmode } from '../stores/darkmodeStore';
import { useTokens } from '../stores/tokenStore';
import Footer from '../components/Footer.jsx';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const { isDarkmodeActive } = useDarkmode();
    const { accessToken, refreshToken, setAccessToken, setRefreshToken } = useTokens();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const showMessage = (messageText) => {
        setMessage(messageText);
        setTimeout(() => setMessage(""), 3000);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleLogin = async (e) => {
        e.preventDefault(); // Formun refresh olmasının qarşısını alırıq
        if (!formData.email || !formData.password) {
            showMessage("Please fill in all fields.");
            return;
        }

        setIsLoading(true);
        try {
            const { data } = await axios.post("https://ilkinibadov.com/api/b/auth/login", formData);

            setAccessToken(data.accessToken);
            setRefreshToken(data.refreshToken);
            showMessage("Login successful!");

            setTimeout(() => navigate("/"), 500);
        } catch (error) {
            showMessage(error.response?.data?.message || "Login failed");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={`min-h-screen flex flex-col transition-all duration-500 ${isDarkmodeActive ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
            }`}>
            {message && (
                <div className={`fixed top-10 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full shadow-2xl z-50 animate-bounce transition-all ${isDarkmodeActive ? 'bg-indigo-500 text-white' : 'bg-gray-800 text-white'
                    }`}>
                    {message}
                </div>
            )}

            <NavbarLog />

            <main className="grow flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md space-y-8">

                    <div className="text-center">
                        <h1 className="text-5xl font-extrabold mb-2 tracking-tight">Welcome</h1>
                        <p className="opacity-60 text-lg">Please login to your account</p>
                    </div>

                    <div className={`p-8 rounded-3xl shadow-xl transition-all border ${isDarkmodeActive ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                        }`}>
                        <form className="space-y-6" onSubmit={handleLogin}>
                            <div>
                                <label className="block text-sm font-medium mb-2 ml-1">Email Address</label>
                                <input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="name@example.com"
                                    className={`w-full h-12 px-4 rounded-xl border focus:outline-none focus:ring-2 transition-all ${isDarkmodeActive
                                        ? 'bg-gray-900 border-gray-700 focus:ring-indigo-500 placeholder-gray-600'
                                        : 'bg-gray-50 border-gray-200 focus:ring-indigo-400 placeholder-gray-400'
                                        }`}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 ml-1">Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="••••••••"
                                    className={`w-full h-12 px-4 rounded-xl border focus:outline-none focus:ring-2 transition-all ${isDarkmodeActive
                                        ? 'bg-gray-900 border-gray-700 focus:ring-indigo-500 placeholder-gray-600'
                                        : 'bg-gray-50 border-gray-200 focus:ring-indigo-400 placeholder-gray-400'
                                        }`}
                                />
                            </div>

                            <div className="flex justify-between items-center text-sm">
                                <button
                                    type="button"
                                    onClick={() => navigate("/register")}
                                    className="text-indigo-500 hover:text-indigo-400 font-medium transition-colors"
                                >
                                    Create account?
                                </button>
                                <span className="opacity-50">Forgot password?</span>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full h-14 rounded-xl font-bold text-lg shadow-lg transition-all transform active:scale-95 ${isDarkmodeActive
                                    ? 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-indigo-900/20'
                                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
                                    } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isLoading ? "Checking..." : "Login"}
                            </button>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Login;