import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Blogs from '../pages/Blogs.jsx'
import Register from '../pages/Register.jsx'
import Login from '../pages/Login.jsx'
import BlogDetails from '../pages/BlogDetails.jsx'
import AuthorPage from '../pages/AuthorPage.jsx'
import CreateBlog from '../pages/CreateBlog.jsx'
import NotFound from '../pages/NotFound.jsx'



const Navigator = () => {
    return (
        <Routes>
            <Route path='/' element={<Blogs />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/details/:blogId' element={<BlogDetails />} />
            <Route path='/author' element={<AuthorPage />} />
            <Route path='/create' element={<CreateBlog />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}

export default Navigator