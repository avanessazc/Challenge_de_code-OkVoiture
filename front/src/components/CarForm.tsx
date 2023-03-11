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
    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [designation, setDesignation] = useState<string>('')
    const [city, setCity] = useState<string>('')
    const [numberplate, setNumberplate] = useState<string>('')
    const [price, setPrice] = useState<number>(0)
    // const [photo, setPhoto] = useState<string>('')

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }
    return (
        <div className='container mb-3 mt-3'>
            <div className='col-md-4 offset-md-4'>
                <h1 className='text-center'>Car</h1>
                <form onSubmit={handleSubmit} className='card card-body bg-dark'>
                    <label>
                        Name:
                        <input
                            type='text'
                            name='username'
                            placeholder='Username'
                            value={username}
                            className='form-control mb-2'
                            required
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type='email'
                            name='email'
                            placeholder='Email'
                            value={email}
                            className='form-control mb-2'
                            required
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        />
                    </label>
                    <label>
                        Designation:
                        <input
                            type='text'
                            name='designation'
                            placeholder='mark/model/year'
                            value={designation}
                            className='form-control mb-2'
                            required
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setDesignation(e.target.value)}
                        />
                    </label>
                    <label>
                        City:
                        <input
                            type='text'
                            name='city'
                            placeholder='City'
                            value={city}
                            className='form-control mb-2'
                            required
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setCity(e.target.value)}
                        />
                    </label>
                    <label>
                        Numberplate:
                        <input
                            type='text'
                            name='numberplate'
                            placeholder='Numberplate'
                            value={numberplate}
                            className='form-control mb-2'
                            required
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setNumberplate(e.target.value)}
                        />
                    </label>
                    <label>
                        Price per day €:
                        <input
                            type='number'
                            min='1'
                            max='10000'
                            name='price'
                            placeholder='Price €'
                            value={price}
                            className='form-control mb-2'
                            required
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(parseInt(e.target.value))}
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
