import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    const [navbarOpen, setNavbarOpen] = useState(false)
    return (
        <>
            <nav className='relative flex flex-wrap items-center justify-between px-2 py-3 bg-stone-500'>
                <div className='container px-4 mx-auto flex flex-wrap items-center justify-between'>
                    <div className='w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start'>
                        <Link
                            to='/'
                            className='text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white'
                        >
                            OK Voiture
                        </Link>
                        <button
                            className='text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none'
                            type='button'
                            onClick={() => setNavbarOpen(!navbarOpen)}
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className='w-6 h-6'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5'
                                />
                            </svg>
                        </button>
                    </div>
                    <div
                        className={
                            'lg:flex flex-grow items-center' + (navbarOpen ? ' flex' : ' hidden')
                        }
                        id='example-navbar-danger'
                    >
                        <ul className='flex flex-col lg:flex-row list-none lg:ml-auto'>
                            <li className='nav-item'>
                                <Link
                                    to='/'
                                    className='px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75'
                                >
                                    Register
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link
                                    to='/cars'
                                    className='px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75'
                                >
                                    Voitures
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link
                                    to='/'
                                    className='px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75'
                                >
                                    Reservations
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
