import { useState, ChangeEvent, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'

type Car = {
    username: string
    email: string
    designation: string
    city: string
    numberplate: string
    price: number
    // photo: File
}

const CarForm = () => {
    const [car, setCar] = useState<Car>({
        username: '',
        email: '',
        designation: '',
        city: '',
        numberplate: '',
        price: 0
    })

    return (
        <div className='container mb-3 mt-3'>
            <div className='col-md-4 offset-md-4'>
                <h1 className='text-center'>Car</h1>
                <form className='card card-body bg-dark tex-white'>
                    <label>
                        Name:
                        <input
                            type='text'
                            name='username'
                            placeholder='Username'
                            value={car.username}
                            className='form-control mb-2'
                            required
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type='email'
                            name='email'
                            placeholder='Email'
                            value={car.email}
                            className='form-control mb-2'
                            required
                        />
                    </label>
                    <label>
                        Designation:
                        <input
                            type='text'
                            name='designation'
                            placeholder='mark/model/year'
                            value={car.designation}
                            className='form-control mb-2'
                            required
                        />
                    </label>
                    <label>
                        City:
                        <input
                            type='text'
                            name='city'
                            placeholder='City'
                            value={car.city}
                            className='form-control mb-2'
                            required
                        />
                    </label>
                    <label>
                        Numberplate:
                        <input
                            type='text'
                            name='numberplate'
                            placeholder='Numberplate'
                            value={car.numberplate}
                            className='form-control mb-2'
                            required
                        />
                    </label>
                    <label>
                        Price per day:
                        <input
                            type='text'
                            name='price'
                            placeholder='Price'
                            value={car.price}
                            className='form-control mb-2'
                            required
                        />
                    </label>
                    <label>
                        Car&apos;s Photo:
                        <input
                            type='file'
                            name='photo'
                            placeholder="Car's Photo"
                            className='form-control mb-2'
                            required
                        />
                    </label>
                    <button className='mt-3 btn-danger'>Register</button>
                </form>
            </div>
        </div>
    )
}

export default CarForm
