import { useState, ChangeEvent, useRef, useEffect } from 'react'
// import { useHistory } from 'react-router-dom'
import { useFormik, FormikHelpers } from 'formik'
import { schema } from '../rules'
import axios from 'axios'
import { CarFormValues, CityInfo } from '../types'

const CarForm = () => {
    // Ref to the element that upload the photo
    const photoRef = useRef<HTMLInputElement | null>(null)
    const [cities, setCities] = useState<CityInfo[]>([])
    const [errorResponseApi, setErrorResponseApi] = useState<string>('')
    // Get cities information from GEO API
    useEffect(() => {
        axios
            .get('https://geo.api.gouv.fr/departements/987/communes')
            .then((res) => {
                setCities(res.data)
            })
            .catch((err: unknown) => {
                setCities([])
            })
    }, [])
    // Send form information to the backend
    const onSubmit = (values: CarFormValues, actions: FormikHelpers<CarFormValues>) => {
        console.log('values: ', values) // TO DELETE
        axios
            .post('http://localhost:3000/cars', values, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                console.log(response.data)
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
                console.log('submit error: ', error)
            })
        // Clear the element that upload the photo
        if (photoRef.current) {
            photoRef.current.value = ''
        }
        actions.resetForm()
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
    const { values, errors, touched, isSubmitting, handleChange, handleSubmit, setFieldValue } =
        useFormik({
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
                            value={values.username}
                            className='form-control mb-2'
                            required
                            onChange={handleChange}
                        />
                        {errors.username && touched.username && (
                            <span className='text-danger'>{errors.username}</span>
                        )}
                    </label>
                    <label>
                        Email:
                        <input
                            type='email'
                            name='email'
                            placeholder='Email'
                            value={values.email}
                            className='form-control mb-2'
                            required
                            onChange={handleChange}
                        />
                        {errors.email && touched.email && (
                            <span className='text-danger'>{errors.email}</span>
                        )}
                    </label>
                    <label>
                        Designation:
                        <input
                            type='text'
                            name='designation'
                            placeholder='mark/model/year'
                            value={values.designation}
                            className='form-control mb-2'
                            required
                            onChange={handleChange}
                        />
                        {errors.designation && touched.designation && (
                            <span className='text-danger'>{errors.designation}</span>
                        )}
                    </label>
                    <label>
                        City:
                        <select
                            value={values.city}
                            name='city'
                            onChange={handleChange}
                            className='form-select mb-2'
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
                            <span className='text-danger'>{errors.city}</span>
                        )}
                    </label>
                    <label>
                        Numberplate:
                        <input
                            type='text'
                            name='numberplate'
                            placeholder='Numberplate'
                            value={values.numberplate}
                            className='form-control mb-2'
                            required
                            onChange={handleChange}
                        />
                        {errors.numberplate && touched.numberplate && (
                            <span className='text-danger'>{errors.numberplate}</span>
                        )}
                        {errorResponseApi && (
                            <span className='text-danger'>{errorResponseApi}</span>
                        )}
                    </label>
                    <label>
                        Price €:
                        <input
                            type='number'
                            min='1'
                            max='10000'
                            name='price'
                            placeholder='Price €'
                            value={values.price}
                            className='form-control mb-2'
                            required
                            onChange={handleChange}
                        />
                        {errors.price && touched.price && (
                            <span className='text-danger'>{errors.price}</span>
                        )}
                    </label>
                    <label>
                        Car&apos;s Photo:
                        <input
                            type='file'
                            name='photo'
                            className='form-control mb-2'
                            required
                            onChange={onFileInputChange}
                            accept='image/png, image/jpeg'
                            ref={photoRef}
                        />
                    </label>
                    <button
                        disabled={isSubmitting}
                        className='mt-3 btn btn-outline-danger'
                        type='submit'
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CarForm
