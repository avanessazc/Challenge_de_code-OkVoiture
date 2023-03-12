import { useState, ChangeEvent, useRef } from 'react'
// import { useHistory } from 'react-router-dom'
import { useFormik, FormikHelpers } from 'formik'
import { schema } from '../rules'
import axios from 'axios'
// https://geo.api.gouv.fr/departements/987/communes
type CarFormValues = {
    username: string
    email: string
    designation: string
    city: string
    numberplate: string
    price: number
    photo: File
}

type CityInfo = {
    nom: string
    code: string
    codeDepartement: string
    codeRegion: string
    codesPostaux: string[]
    population: number
}
// const getCities = (): CityInfo[] => {
//     let cities: CityInfo[] = []

//     return cities
// }

const CarForm = () => {
    const photoRef = useRef<HTMLInputElement | null>(null)
    const [cities, setCities] = useState<CityInfo[]>([])

    axios
        .get('https://geo.api.gouv.fr/departements/987/communes')
        .then((res: any) => {
            setCities(res.data)
        })
        .catch((err: unknown) => {
            console.log('submit error: ', err)
        })

    // const cities: CityInfo[] = getCities()
    // console.log(cities)
    const onSubmit = (values: CarFormValues, actions: FormikHelpers<CarFormValues>) => {
        console.log('values: ', values)

        axios
            .post('http://localhost:3000/cars', values, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then()
            .catch((err: unknown) => {
                console.log('submit error: ', err)
            })
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
                    {/* <label>
                        City:
                        <input
                            type='text'
                            name='city'
                            placeholder='City'
                            value={values.city}
                            className='form-control mb-2'
                            required
                            onChange={handleChange}
                        />
                    </label> */}
                    <label>
                        City:
                        <select className='form-select mb-2'>
                            {cities.length != 0 &&
                                cities.map((city: CityInfo) => (
                                    <option key={city.code}>{city.nom}</option>
                                ))}
                        </select>
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
                    </label>
                    <label>
                        Price per day €:
                        <input
                            type='number'
                            min='0'
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
