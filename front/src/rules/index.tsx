import * as yup from 'yup'

const emailRule = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
const designationRule = /^([a-zA-Z0-9]+)\/([a-zA-Z0-9]+)\/([0-9]{4})$/

export const schema = yup.object().shape({
    username: yup.string().max(30, 'Too long! Max 30 characters').required('Required'),
    email: yup
        .string()
        .matches(emailRule, { message: 'Please enter a valid email' })
        .max(100, 'Too long! Max 100 characters')
        .required('Required'),
    designation: yup
        .string()
        .matches(designationRule, { message: 'Please enter mark/model/year' })
        .required('Required'),
    city: yup.string().max(50, 'Too long! Max 50 characters').required('Required'),
    price: yup.number().positive().integer().required('Required'),
    photo: yup.mixed().nullable().required('File is required')
})
