import { useState, ChangeEvent, FormEvent } from 'react'
// import { useHistory } from 'react-router-dom'
import { useFormik, FormikHelpers } from 'formik'
import { schema } from '../rules'

type CarFormValues = {
    username: string
    email: string
    designation: string
    city: string
    numberplate: string
    price: number
    // photo: File
}

const onSubmit = (values: CarFormValues, actions: FormikHelpers<CarFormValues>) => {
    console.log('Info sent')
    actions.resetForm()
}

const CarForm = () => {
    const initValues: CarFormValues = {
        username: '',
        email: '',
        designation: '',
        city: '',
        numberplate: '',
        price: 0
    }
    const { values, errors, touched, isSubmitting, handleChange, handleSubmit } = useFormik({
        initialValues: initValues,
        validationSchema: schema,
        onSubmit
    })

    console.log(errors)
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
                    <label>
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
                            placeholder="Car's Photo"
                            className='form-control mb-2'
                            required
                        />
                    </label>
                    <button disabled={isSubmitting} className='mt-3 btn-danger' type='submit'>
                        Register
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CarForm
