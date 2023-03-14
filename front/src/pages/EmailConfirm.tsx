import { useParams, Link } from 'react-router-dom'

const EmailConfirm = () => {
    const { status } = useParams<{ status: string }>()
    return (
        <div className='constainer my-5 text-teal-800'>
            <div className='grid'>
                <div className='flex flex-col items-center'>
                    <h1 className='text-4xl my-3'>Email confirmation {status}!</h1>
                    <Link to='/' className='my-3'>
                        Back to the homepage...
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default EmailConfirm
