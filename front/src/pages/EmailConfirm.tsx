import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useJwt } from 'react-jwt'

const EmailConfirm = () => {
    const { token } = useParams<{ token: string }>()
    const [errorResponseApi, setErrorResponseApi] = useState<string>('')
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
    const { decodedToken } = useJwt<{ owner: { email: string } }>(token)
    const handleSubmit = () => {
        setIsSubmitted(true)
        axios
            .get(`http://localhost:3000/cars/email-confirmation/${token}`)
            .then(() => {
                setErrorResponseApi('Successful')
            })
            .catch((error) => {
                if (axios.isAxiosError(error) && error.response) {
                    if (error.response.data.statusCode == 409) {
                        setErrorResponseApi('Your car is already registered!')
                    } else if (error.response.data.statusCode == 400) {
                        setErrorResponseApi('Failed')
                    }
                }
            })
    }
    return (
        <div className='constainer my-5 text-teal-800'>
            <div className='grid'>
                <div className='flex flex-col items-center'>
                    <h1 className='text-2xl my-3'>
                        Email confirmation:{' '}
                        <span className='text-xl font-bold'>{decodedToken?.owner.email}</span>
                    </h1>
                    {!isSubmitted && (
                        <div className='flex justify-center'>
                            <button
                                className='bg-yellow-600 my-4 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                                onClick={handleSubmit}
                            >
                                Confirm
                            </button>
                        </div>
                    )}
                    {isSubmitted && <p className='my-3'>{errorResponseApi}</p>}
                    {isSubmitted && (
                        <Link to='/' className='my-3'>
                            Back to the homepage...
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default EmailConfirm
