import React from 'react'
import Footer from './components/Footer.jsx'
import NavbarSt from './components/NavbarSt.jsx'

const App = () => {
    return (
        <div className='w-full mx-auto'>
            <div className='max-w-360 mx-auto'>
                <NavbarSt />
                <Footer />
            </div>
        </div>
    )
}

export default App