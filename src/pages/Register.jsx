import React, { useState } from 'react';
import axios from '../utils/axios';
import NavbarLog from '../components/NavbarLog.jsx';
import Footer from '../components/Footer.jsx';
import { useDarkmode } from '../stores/darkmodeStore';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const { isDarkmodeActive } = useDarkmode();
    const [formData, setFormData] = useState({ firstname: "", lastname: "", email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const registerHandling = async (e) => {
        e.preventDefault();

        if (!formData.firstname || !formData.lastname || !formData.email || !formData.password) {
            alert("Please fill in all fields.");
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post("/auth/register", formData);

            if (response.status === 200 || response.status === 201) {
                alert("Registered successfully!");
                navigate("/login");
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || "An error occurred during registration.";
            alert(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`w-full min-h-screen flex flex-col transition-all duration-500 ${isDarkmodeActive ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
            }`}>
            <NavbarLog />

            <main className="grow flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-lg space-y-8">

                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Join Us</h1>
                        <p className="opacity-60 mt-2 text-lg">Create an account to start blogging</p>
                    </div>

                    <div className={`p-8 md:p-10 rounded-3xl shadow-2xl transition-all border ${isDarkmodeActive ? 'bg-gray-800 border-gray-700 shadow-black/20' : 'bg-white border-gray-100'
                        }`}>
                        <form className="space-y-5" onSubmit={registerHandling}>

                            {/* Ad və Soyad yan-yana */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium ml-1 opacity-70">First Name</label>
                                    <input
                                        name="firstname"
                                        onChange={handleInputChange}
                                        type="text"
                                        placeholder="John"
                                        className={`w-full h-12 px-4 rounded-xl border focus:outline-none focus:ring-2 transition-all ${isDarkmodeActive
                                            ? 'bg-gray-900 border-gray-700 focus:ring-indigo-500 placeholder-gray-600'
                                            : 'bg-gray-50 border-gray-200 focus:ring-indigo-400 placeholder-gray-400'
                                            }`}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium ml-1 opacity-70">Last Name</label>
                                    <input
                                        name="lastname"
                                        onChange={handleInputChange}
                                        type="text"
                                        placeholder="Doe"
                                        className={`w-full h-12 px-4 rounded-xl border focus:outline-none focus:ring-2 transition-all ${isDarkmodeActive
                                            ? 'bg-gray-900 border-gray-700 focus:ring-indigo-500 placeholder-gray-600'
                                            : 'bg-gray-50 border-gray-200 focus:ring-indigo-400 placeholder-gray-400'
                                            }`}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium ml-1 opacity-70">Email Address</label>
                                <input
                                    name="email"
                                    onChange={handleInputChange}
                                    type="email"
                                    placeholder="john@example.com"
                                    className={`w-full h-12 px-4 rounded-xl border focus:outline-none focus:ring-2 transition-all ${isDarkmodeActive
                                        ? 'bg-gray-900 border-gray-700 focus:ring-indigo-500 placeholder-gray-600'
                                        : 'bg-gray-50 border-gray-200 focus:ring-indigo-400 placeholder-gray-400'
                                        }`}
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium ml-1 opacity-70">Password</label>
                                <input
                                    name="password"
                                    onChange={handleInputChange}
                                    type="password"
                                    placeholder="••••••••"
                                    className={`w-full h-12 px-4 rounded-xl border focus:outline-none focus:ring-2 transition-all ${isDarkmodeActive
                                        ? 'bg-gray-900 border-gray-700 focus:ring-indigo-500 placeholder-gray-600'
                                        : 'bg-gray-50 border-gray-200 focus:ring-indigo-400 placeholder-gray-400'
                                        }`}
                                />
                            </div>

                            <button
                                type="button"
                                onClick={() => navigate("/login")}
                                className="text-indigo-500 text-sm font-medium hover:underline block"
                            >
                                Already have an account?
                            </button>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full h-14 mt-4 rounded-xl font-bold text-lg shadow-lg transition-all transform active:scale-95 disabled:opacity-50 ${isDarkmodeActive
                                    ? 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-indigo-900/20'
                                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
                                    }`}
                            >
                                {isLoading ? "Creating account..." : "Register"}
                            </button>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Register;