import React, { useEffect, useState } from 'react';
import NavbarSt from '../components/NavbarSt.jsx';
import api from '../utils/axios.js';
import CardSAuth from '../components/CardSAuth.jsx';
import Footer from '../components/Footer.jsx';
import { useTokens } from '../stores/tokenStore.js';
import { useDarkmode } from '../stores/darkmodeStore.js';


const AuthorPage = () => {
    const { isDarkmodeActive } = useDarkmode();
    const { accessToken, refreshToken, setAccessToken } = useTokens();
    const [authorBlogs, setAuthorBlogs] = useState([]);
    const [productLimit, setProductLimit] = useState(9);


    const refreshTokens = async () => {
        try {
            const data = await api.post('/auth/refresh', { refreshToken });
            setAccessToken(data.accessToken);
            console.log(data, 'Tokens refreshed successfully');
            return data.accessToken;
        } catch (error) {
            console.error('Failed to refresh tokens:', error.response?.data || error.message);
            return null;
        }
    }

    const getAuthorData = async (token) => {
        if (!token) return; // token yoxdursa çıx

        try {
            const { data } = await api.get('/blogs/user/me', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAuthorBlogs((data || []).slice(0, productLimit));
            console.log("Author blogs:", data);
        } catch (error) {
            console.error("Error fetching author blogs:", error.response?.data || error.message);

            if (error.response?.status === 401 && refreshToken) {
                const newToken = await refreshTokens();
                if (newToken) {
                    await getAuthorData(newToken);
                } else {
                    alert("Session expired. Please log in again.");
                    // navigate("/login");
                }
            } else if (error.response?.status === 403) {
                alert("You are not authorized to access this resource.");
            }
        }
    };

    const isAuthenticated = async () => {
        let token = accessToken;

        if (!token && refreshToken) {
            token = await refreshTokens();
            if (!token) {
                alert("You need to log in to access this page.");
                // navigate("/login");
                return;
            }
        }

        if (!token) {
            alert("You need to log in to access this page.");
            // navigate("/login");
            return;
        }

        await getAuthorData(token);
    };

    const refreshBlogs = () => {
        isAuthenticated();
    };

    useEffect(() => {
        isAuthenticated();
    }, [productLimit]);

    return (
        <div className={`w-full min-h-screen overflow-hidden flex justify-center transition-all duration-500 ${isDarkmodeActive ? 'bg-gray-900' : 'bg-white'
            }`}>
            <div className='w-full grow max-w-360 mx-auto'>
                <NavbarSt />
                <div className='w-full flex flex-col gap-10 items-center'>
                    <h1 className={`w-304 h-31 flex justify-center items-center text-2xl font-semibold rounded-lg transition-all duration-300 ${isDarkmodeActive ? 'bg-gray-800 text-gray-100 shadow-md shadow-gray-700' : 'bg-gray-200 text-gray-900 shadow-sm shadow-gray-300'
                        }`}>{authorBlogs[0]?.user.email}</h1>
                    <h2
                        className={`w-304 h-8 flex items-center text-2xl font-semibold transition-all duration-300 ${isDarkmodeActive ? 'text-gray-100' : 'text-gray-900'
                            }`}
                    >
                        Latest Posts
                    </h2>
                    <div className='w-304 grid grid-cols-3 gap-2 gap-y-1'>
                        {authorBlogs.slice(0).map((blog) => (
                            <CardSAuth key={blog._id} blog={blog} refreshAuthorBlogs={refreshBlogs} />
                        ))}
                    </div>
                    <button
                        onClick={() => setProductLimit((prev) => prev + 6)}
                        className={`w-full max-w-48 h-12 rounded-lg font-semibold text-lg flex justify-center items-center transition-all duration-300 transform ${isDarkmodeActive
                            ? 'bg-gray-700 text-gray-100 hover:bg-gray-600 hover:scale-105 active:scale-95 shadow-md shadow-gray-800'
                            : 'bg-indigo-500 text-white hover:bg-indigo-600 hover:scale-105 active:scale-95 shadow-md shadow-indigo-400'
                            }`}
                    >
                        Load More
                    </button>
                </div>
                <Footer />


            </div>
        </div>
    )
}

export default AuthorPage