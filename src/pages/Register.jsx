import React, { useState } from 'react'
import axios from '../utils/axios';
import NavbarLog from '../components/NavbarLog.jsx'
import Footer from '../components/Footer.jsx'
import { useDarkmode } from '../stores/darkmodeStore';

const Register = () => {
    const { isDarkmodeActive } = useDarkmode();
    const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "" });

    const handleInputChange = (title, value) => {
        setFormData(prevState => ({
            ...prevState,
            [title]: value
        }))
    }

    const registerHandling = async () => {
        try {
            const response = await axios.post("/auth/register", formData, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.status === 200 || response.status === 201) {
                console.log("Registered successfully", response.data);
                alert("Registered successfully!");
            }

        } catch (error) {
            // Serverdən gələn cavab varsa
            if (error.response) {
                console.error("Server error:", error.response);
                alert(error.response.data?.message || "Server error occurred. Try again.");
            } else if (error.request) {
                // Sorğu göndərildi, cavab gəlmədi
                console.error("No response received:", error.request);
                alert("No response from server. Check your network.");
            } else {
                // Digər xətalar
                console.error("Error:", error.message);
                alert("An error occurred: " + error.message);
            }
        }
    };

    return (
        <div className={`w-full min-h-screen flex flex-col transition-all duration-500  ${isDarkmodeActive ? 'bg-gray-900 text-gray-100' : ' text-gray-900'}`} >
            <div className='w-full max-w-360 mx-auto flex flex-col grow'>
                <NavbarLog />
                <div className='h-18 font-bold transition-all duration-500 text-6xl flex justify-center'>Login</div>
                <div
                    className={`w-full h-190 flex items-center justify-center transition-all duration-500
                        ${isDarkmodeActive ? 'bg-gray-900' : 'bg-white'}`}
                >
                    <div
                        className={`w-200 h-100 border flex flex-col gap-6 justify-start transition-all duration-500
                            ${isDarkmodeActive
                                ? 'bg-gray-800 border-gray-700 '
                                : 'bg-white border-gray-200 '
                            }`}
                    >
                        <input
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            type="text"
                            placeholder="Enter your first name"
                            className={`w-full h-19 px-4 text-sm
                                focus:outline-none focus:ring-2 transition-all duration-500
                                ${isDarkmodeActive
                                    ? 'bg-gray-700 text-gray-100 placeholder-gray-400 focus:ring-indigo-400'
                                    : 'bg-gray-100 text-gray-900 placeholder-gray-500 focus:ring-indigo-500'
                                } `}
                        />
                        <input
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            type="text"
                            placeholder="Enter your last name"
                            className={`w-full h-19 px-4 text-sm
                                focus:outline-none focus:ring-2 transition-all duration-500
                                ${isDarkmodeActive
                                    ? 'bg-gray-700 text-gray-100 placeholder-gray-400 focus:ring-indigo-400'
                                    : 'bg-gray-100 text-gray-900 placeholder-gray-500 focus:ring-indigo-500'
                                } `}
                        />
                        <input
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
                            className="text-indigo-500 text-sm text-left hover:underline transition-all duration-500"
                        >
                            Already have an account?
                        </button>

                        <button
                            onClick={registerHandling}
                            className={`w-full h-25 mt-auto font-semibold text-lg transition-all duration-500
                                ${isDarkmodeActive
                                    ? 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-md shadow-indigo-900/40'
                                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md'
                                }`}
                        >
                            Register
                        </button>
                    </div>
                </div>
                <div className='mt-auto'>
                    <Footer />
                </div>


            </div>
        </div >
    )
}

export default Register