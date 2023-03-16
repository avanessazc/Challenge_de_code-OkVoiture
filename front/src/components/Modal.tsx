import { useState, ChangeEvent } from 'react'
import { format } from 'date-fns'
import axios from 'axios'

type Props = {
    carId: string
    setShowModal: (open: boolean) => void
}
const Modal = ({ carId, setShowModal }: Props) => {
    const today = format(new Date(), 'yyyy-MM-dd')
    const maxDate = format(new Date('2030-12-31'), 'yyyy-MM-dd')
    const [startDate, setStartDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'))
    const [endDate, setEndDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'))
    const [error, setError] = useState<string>('')
    const handleSubmit = () => {
        const selectedStartDate = new Date(startDate)
        const selectedEndDate = new Date(endDate)

        if (
            selectedStartDate < new Date(today) ||
            selectedStartDate > new Date(maxDate) ||
            selectedEndDate < new Date(today) ||
            selectedEndDate > new Date(maxDate) ||
            selectedStartDate > selectedEndDate
        ) {
            setError('It is not possible to pick this dates')
            setTimeout(() => {
                setError('')
            }, 3000)
        } else {
            console.log('carId: ', carId)
            axios
                .post(
                    'http://localhost:3000/bookings',
                    {
                        carId,
                        selectedStartDate,
                        selectedEndDate
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
                .then((response) => {
                    console.log(response.data)
                })
                .catch((error) => {
                    console.log('submit error: ', error)
                })

            setShowModal(false)
        }
    }
    return (
        <div>
            <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
                <div className='relative w-auto my-6 mx-auto max-w-3xl'>
                    {/* content */}
                    <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                        {/* header */}
                        <div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t'>
                            <h3 className='text-stone-700 text-xl font-semibold'>Booking</h3>
                        </div>
                        {/* body */}
                        <div>
                            <div className='relative p-6 flex-auto'>
                                <div className='mb-3'>
                                    <label className='text-gray-700 text-sm font-bold mt-2 mr-3'>
                                        Start Date:
                                    </label>
                                    <input
                                        type='date'
                                        name='startdate'
                                        defaultValue={startDate}
                                        min={today}
                                        max={maxDate}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                            setStartDate(e.target.value)
                                        }
                                    ></input>
                                </div>

                                <div>
                                    <label className='text-gray-700 text-sm font-bold mt-2 mr-3'>
                                        End Date:
                                    </label>
                                    <input
                                        type='date'
                                        name='enddate'
                                        defaultValue={endDate}
                                        min={today}
                                        max={maxDate}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                            setEndDate(e.target.value)
                                        }
                                    ></input>
                                </div>
                                {error != '' && (
                                    <span className='text-pink-500 text-sm'>{error}</span>
                                )}
                            </div>
                        </div>
                        {/* footer */}
                        <div className='flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b'>
                            <button
                                className='text-pink-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                                type='button'
                                onClick={() => setShowModal(false)}
                            >
                                Close
                            </button>
                            <button
                                className='bg-yellow-600 my-4 hover:bg-pink-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline'
                                type='button'
                                onClick={handleSubmit}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
        </div>
    )
}

export default Modal
