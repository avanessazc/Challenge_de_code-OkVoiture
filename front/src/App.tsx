import React from 'react'
// import CarForm from './components/CarForm'
import Footer from './components/Footer'
import Content from './components/Content'
import './input.css'
import Navbar from './components/Navbar'

function App() {
    return (
        <div className='flex flex-col h-screen'>
            <Navbar />
            {/* <CarForm /> */}
            {/* <main className='flex-grow bg-gray-200'>Content</main> */}
            <Content />
            <Footer />
        </div>
    )
}

export default App
