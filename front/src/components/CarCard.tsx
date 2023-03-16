import { Car } from '../types'

type props = {
    car: Car
}
const CarCard = ({ car }: props) => {
    return (
        <div className='p-4 max-w-sm'>
            <div className='flex rounded-lg h-full p-8 flex-col border-2 rounded-3xl'>
                <div className='flex justify-center grow'>
                    <div className='flex items-center'>
                        <img
                            width='250'
                            height='250'
                            className=''
                            src={`http://localhost:3000/cars/photos/${car.photo_name}`}
                            alt={car.photo_name}
                        />
                    </div>
                </div>
                <div>
                    <div className='flex justify-center'>
                        <div className='block text-gray-700 text-sm font-bold mt-2'>
                            {car.designation}
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <div>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                                className='w-6 h-6'
                            >
                                <path d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z' />
                                <path d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z' />
                            </svg>
                        </div>
                        <div className='block text-gray-700 text-sm font-bold mt-2'>{car.city}</div>
                        <div className='block text-gray-700 text-sm font-bold mt-2 ml-2'>
                            {car.price}€/Day
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <button className='bg-yellow-600 my-4 hover:bg-pink-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline'>
                            Book
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CarCard
