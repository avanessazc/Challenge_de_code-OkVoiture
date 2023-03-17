import { Booking } from '../types'
import { useState } from 'react'
import axios from 'axios'

type Props = {
    booking: Booking
}
const CarBooking = ({ booking }: Props) => {
    const [deleted, setDeleted] = useState<string>('')
    const handleSubmit = () => {
        axios
            .delete(`http://localhost:3000/bookings/delete/'${booking.id}'`)
            .then(() => {
                setDeleted('Deleted')
            })
            .catch((error) => {
                console.log('submit error: ', error)
            })
    }
    return (
        <>
            <td className='px-2'>
                <div className='rounded-xl py-2 bg-slate-100'>
                    <div className='text-center px-2'>{booking.email}</div>
                </div>
            </td>
            <td className='px-2'>
                <div className='rounded-xl py-2 bg-slate-100 uppercase'>
                    <div className='text-center px-2'>{booking.designation}</div>
                </div>
            </td>
            <td className='px-2'>
                <div className='rounded-xl py-2 bg-slate-100 uppercase'>
                    <div className='text-center px-2'>{booking.numberplate}</div>
                </div>
            </td>
            <td className='px-2'>
                <div className='rounded-xl py-2 bg-slate-100'>
                    <div className='text-center px-2'>{booking.start_date}</div>
                </div>
            </td>
            <td className='px-2'>
                <div className='rounded-xl py-2 bg-slate-100'>
                    <div className='text-center px-2'>{booking.end_date}</div>
                </div>
            </td>
            <td className='px-2'>
                {deleted == '' && (
                    <div className='flex items-center justify-center py-2'>
                        <button onClick={handleSubmit}>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                                className='w-6 h-6 text-red-600 font-bold'
                            >
                                <path d='M6 18L18 6M6 6l12 12' />
                            </svg>
                        </button>
                    </div>
                )}
                {deleted != '' && (
                    <div className='py-2 text-red-600 font-bold'>
                        <div className='text-center px-2'>{deleted}</div>
                    </div>
                )}
            </td>
        </>
    )
}

export default CarBooking
