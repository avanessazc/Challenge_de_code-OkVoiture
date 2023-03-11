import * as yup from 'yup'

const emailRule = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
const designationRule = /^([a-zA-Z0-9]+)\/([a-zA-Z0-9]+)\/([0-9]{4})$/

export const schema = yup.object().shape({
    email: yup
        .string()
        .matches(emailRule, { message: 'Please enter a valid email' })
        .required('Required'),
    designation: yup
        .string()
        .matches(designationRule, { message: 'Please enter mark/model/year' })
        .required('Required'),
    price: yup.number().positive().integer().required('Required')
})
