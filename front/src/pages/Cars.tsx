import axios from 'axios'
import { useState, useEffect } from 'react'
import CarCard from '../components/CarCard'
import { Car } from '../types'

const Cars = () => {
    const [carsList, setCarsList] = useState<Car[]>([])
    useEffect(() => {
        axios
            .get('http://localhost:3000/cars/list')
            .then((response) => {
                setCarsList(response.data)
            })
            .catch((error) => {
                console.log('submit error: ', error)
            })
    }, [])
    return (
        <div className='mt-4 mb-12'>
            <h1 className='flex justify-center text-4xl text-gray-700'>Cars</h1>
            <div className='flex flex-wrap justify-center mt-10'>
                {carsList.length != 0 &&
                    carsList.map((car: Car) => <CarCard key={car.id} car={car} />)}
            </div>
        </div>
    )
}

export default Cars
