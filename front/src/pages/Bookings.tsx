import axios from 'axios'
import { useState, useEffect } from 'react'
import CarBooking from '../components/CarBooking'
import { Booking } from '../types'

const Bookings = () => {
    const [bookingsList, setBookingsList] = useState<Booking[]>([])
    const headers: string[] = ['Email', 'Designation', 'Numberplate', 'Start', 'End', 'Actions']
    useEffect(() => {
        axios
            .get('http://localhost:3000/bookings/list')
            .then((response) => {
                setBookingsList(response.data)
            })
            .catch(() => {})
    }, [])

    return (
        <div className='mt-4 mb-12'>
            <h1 className='flex justify-center text-4xl text-gray-700'>Bookings</h1>
            <div className='flex justify-center mt-10 flex-col items-center'>
                <table className='table-auto'>
                    <thead>
                        <tr>
                            {headers.length != 0 &&
                                headers.map((header: string) => (
                                    <th className='uppercase text-gray-700 px-4' key={header}>
                                        {header}
                                    </th>
                                ))}
                        </tr>
                    </thead>
                    <tbody>
                        {bookingsList.length != 0 &&
                            bookingsList.map((booking: Booking) => (
                                <tr key={booking.id}>
                                    <CarBooking booking={booking} />
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Bookings
