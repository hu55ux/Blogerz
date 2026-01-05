import React, { useEffect, useState } from 'react';
import NavbarSt from '../components/NavbarSt.jsx';
import api from '../utils/axios.js';
import CardSAuth from '../components/CardSAuth.jsx';
import Footer from '../components/Footer.jsx';
import { useTokens } from '../stores/tokenStore.js';
import { useDarkmode } from '../stores/darkmodeStore.js';
import { useNavigate } from 'react-router-dom';

const AuthorPage = () => {
    const { isDarkmodeActive } = useDarkmode();
    const { accessToken, refreshToken, setAccessToken, clearTokens } = useTokens();
    const [authorBlogs, setAuthorBlogs] = useState([]);
    const [productLimit, setProductLimit] = useState(9);
    const navigate = useNavigate();

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

    const getAuthorData = async () => {
        try {
            const { data } = await api.get('/blogs/user/me', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            setAuthorBlogs((data || []).slice(0, productLimit));
        } catch (error) {
            if (error.response?.status === 401 && refreshToken) {
                const newToken = await refreshTokens();
                if (!newToken) {
                    logout();
                    return;
                }
                await getAuthorData();
            }
        }
    };

    const isAuthenticated = async () => {
        if (!accessToken && !refreshToken) {
            navigate("/login");
            return;
        }
        if (!accessToken && refreshToken) {
            const newToken = await refreshTokens();
            if (!newToken) {
                logout();
                return;
            }
        }
        await getAuthorData();
    };

    const logout = () => {
        clearTokens();
        navigate("/login");
    };

    useEffect(() => {
        isAuthenticated();
    }, [productLimit]);

    return (
        <div className={`w-full min-h-screen transition-all duration-500 ${isDarkmodeActive ? 'bg-gray-900' : 'bg-white'
            }`}>
            <NavbarSt />

            <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
                <div className='flex flex-col gap-12 items-center'>

                    <div className={`w-full max-w-4xl p-8 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 ${isDarkmodeActive
                        ? 'bg-gray-800 text-gray-100 border border-gray-700 shadow-xl'
                        : 'bg-gray-50 text-gray-900 border border-gray-200 shadow-sm'
                        }`}>
                        <div className="w-16 h-16 bg-indigo-500 rounded-full mb-4 flex items-center justify-center text-white text-2xl font-bold">
                            {authorBlogs[0]?.user.email.charAt(0).toUpperCase()}
                        </div>
                        <h1 className="text-xl md:text-2xl font-semibold opacity-90">
                            {authorBlogs[0]?.user.email || "Author's Dashboard"}
                        </h1>
                        <p className="text-sm mt-2 opacity-60">My Personal Blog Posts</p>
                    </div>

                    <div className="w-full max-w-6xl">
                        <h2 className={`text-2xl font-bold mb-8 transition-all duration-300 ${isDarkmodeActive ? 'text-gray-100' : 'text-gray-900'
                            }`}>
                            Latest Posts
                        </h2>

                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                            {authorBlogs.length > 0 ? (
                                authorBlogs.map((blog) => (
                                    <CardSAuth
                                        key={blog._id}
                                        blog={blog}
                                        refreshAuthorBlogs={isAuthenticated}
                                    />
                                ))
                            ) : (
                                <p className="col-span-full text-center py-10 opacity-50">No posts found.</p>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={() => setProductLimit((prev) => prev + 6)}
                        className={`mt-6 px-10 py-3 rounded-xl font-semibold text-lg transition-all duration-300 transform active:scale-95 ${isDarkmodeActive
                            ? 'bg-gray-800 text-gray-100 hover:bg-gray-700 border border-gray-700 shadow-lg'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200'
                            }`}
                    >
                        Load More
                    </button>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default AuthorPage;