import { useState, ChangeEvent, useRef, useEffect } from 'react'
import { useFormik, FormikHelpers } from 'formik'
import { schema } from '../rules'
import axios from 'axios'
import { CarFormValues, CityInfo } from '../types'

const CarForm = () => {
    // Ref to the element that upload the photo
    const photoRef = useRef<HTMLInputElement | null>(null)
    const [cities, setCities] = useState<CityInfo[]>([])
    const [errorResponseApi, setErrorResponseApi] = useState<string>('')
    const [checkEmailMessage, setCheckEmailMessage] = useState<boolean>(false)
    // Get cities information from GEO API
    useEffect(() => {
        axios
            .get('https://geo.api.gouv.fr/departements/987/communes')
            .then((response) => {
                setCities(response.data)
            })
            .catch(() => {
                setCities([])
            })
    }, [])
    // Send form information to the backend
    const onSubmit = (values: CarFormValues, actions: FormikHelpers<CarFormValues>) => {
        axios
            .post('http://localhost:3000/cars', values, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(() => {
                // Clear the element that upload the photo
                if (photoRef.current) {
                    photoRef.current.value = ''
                }
                actions.resetForm()
                setCheckEmailMessage(true)
                setTimeout(() => {
                    setCheckEmailMessage(false)
                }, 7000)
            })
            .catch((error) => {
                if (
                    axios.isAxiosError(error) &&
                    error.response &&
                    error.response.data.statusCode == 409
                ) {
                    setErrorResponseApi(error.response.data.message)
                    setTimeout(() => {
                        setErrorResponseApi('')
                    }, 3000)
                }
            })
    }

    const initValues: CarFormValues = {
        username: '',
        email: '',
        designation: '',
        city: '',
        numberplate: '',
        price: 0,
        photo: {} as File
    }
    // Formik validate the field before submit them
    const { values, errors, touched, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initValues,
        validationSchema: schema,
        onSubmit
    })

    const onFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFieldValue('photo', event.target.files[0])
        }
    }
    return (
        <div className='flex justify-center items-center my-5'>
            <div className=''>
                <div className='flex flex-col items-center'>
                    <h1 className='text-4xl text-gray-700'>Register</h1>
                    <form onSubmit={handleSubmit} className=''>
                        <div className=''>
                            <div className=''>
                                <label className='block text-gray-700 text-sm font-bold mt-2'>
                                    Name:
                                </label>
                            </div>
                            <div className=''>
                                <input
                                    type='text'
                                    name='username'
                                    placeholder='Name'
                                    value={values.username}
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    required
                                    onChange={handleChange}
                                />
                                {errors.username && touched.username && (
                                    <span className='text-pink-500 text-sm'>{errors.username}</span>
                                )}
                            </div>
                        </div>

                        <div className=''>
                            <div className=''>
                                <label className='block text-gray-700 text-sm font-bold mt-2'>
                                    Email:
                                </label>
                            </div>
                            <div className=''>
                                <input
                                    type='text'
                                    name='email'
                                    placeholder='Email'
                                    value={values.email}
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    required
                                    onChange={handleChange}
                                />
                                {errors.email && touched.email && (
                                    <span className='text-pink-500 text-sm'>{errors.email}</span>
                                )}
                            </div>
                        </div>

                        <div className=''>
                            <div className=''>
                                <label className='block text-gray-700 text-sm font-bold mt-2'>
                                    Designation:
                                </label>
                            </div>
                            <div className=''>
                                <input
                                    type='text'
                                    name='designation'
                                    placeholder='Mark/Model/Year'
                                    value={values.designation}
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    required
                                    onChange={handleChange}
                                />
                                {errors.designation && touched.designation && (
                                    <span className='text-pink-500 text-sm'>
                                        {errors.designation}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className=''>
                            <div className=''>
                                <label className='block text-gray-700 text-sm font-bold mt-2'>
                                    City:
                                </label>
                            </div>
                            <div className=''>
                                <select
                                    value={values.city}
                                    name='city'
                                    onChange={handleChange}
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                >
                                    <option value=''>---- Choose a city ----</option>
                                    {cities.length != 0 &&
                                        cities.map((city: CityInfo) => (
                                            <option value={city.nom} key={city.code}>
                                                {city.nom}
                                            </option>
                                        ))}
                                </select>
                                {errors.city && touched.city && (
                                    <span className='text-pink-500 text-sm'>{errors.city}</span>
                                )}
                            </div>
                        </div>

                        <div className=''>
                            <div className=''>
                                <label className='block text-gray-700 text-sm font-bold mt-2'>
                                    Numberplate:
                                </label>
                            </div>
                            <div className=''>
                                <input
                                    type='text'
                                    name='numberplate'
                                    placeholder='Numberplate'
                                    value={values.numberplate.toUpperCase()}
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    required
                                    onChange={handleChange}
                                />
                                {errors.numberplate && touched.numberplate && (
                                    <span className='text-pink-500 text-sm'>
                                        {errors.numberplate}
                                    </span>
                                )}
                                {errorResponseApi && (
                                    <span className='text-pink-500 text-sm'>
                                        {errorResponseApi}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className=''>
                            <div className=''>
                                <label className='block text-gray-700 text-sm font-bold mt-2'>
                                    Price €/Day:
                                </label>
                            </div>
                            <div className=''>
                                <input
                                    type='number'
                                    min='1'
                                    max='10000'
                                    name='price'
                                    placeholder='Price €'
                                    value={values.price}
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    required
                                    onChange={handleChange}
                                />
                                {errors.price && touched.price && (
                                    <span className='text-pink-500 text-sm'>{errors.price}</span>
                                )}
                            </div>
                        </div>

                        <div className=''>
                            <div className=''>
                                <label className='block text-gray-700 text-sm font-bold mt-2'>
                                    Car&apos;s Photo:
                                </label>
                            </div>
                            <div className=''>
                                <input
                                    type='file'
                                    name='photo'
                                    className='block w-full text-gray-500 border border-gray-300 rounded cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-4000'
                                    required
                                    onChange={onFileInputChange}
                                    accept='image/png, image/jpeg'
                                    ref={photoRef}
                                />
                            </div>
                        </div>
                        <div className='flex justify-center flex-col'>
                            {checkEmailMessage && (
                                <div className='rounded text-teal-600 text-xs pt-3 font-bold'>
                                    Please check your email account to finish registering your car
                                </div>
                            )}
                            <button
                                className='bg-yellow-600 my-4 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                                type='submit'
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CarForm
