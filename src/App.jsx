import React from 'react'
import { useEffect, useState } from 'react'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import NavbarSt from './components/NavbarSt.jsx'
import NavbarLog from './components/NavbarLog.jsx'
import CardL from './components/CardL.jsx'
import CardS from './components/CardS.jsx'
import api from './utils/axios.js'
import Blogs from './pages/Blogs.jsx'
import BlogDetails from './pages/BlogDetails.jsx'
import AuthorPage from './pages/AuthorPage.jsx'
import CreateBlog from './pages/CreateBlog.jsx'
import DropDownMenu from './components/DropDownMenu.jsx'


const App = () => {

    return (
        <div className='w-full mx-auto'>
            <div className='max-w-360 mx-auto'>
                {/* <Blogs /> */}
                <AuthorPage />
                {/* <NavbarSt /> */}
                {/* <Login /> */}
                {/* <CreateBlog /> */}
                {/* <DropDownMenu />     */}

            </div>
        </div>
    )
}

export default App