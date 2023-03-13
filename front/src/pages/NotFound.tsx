import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className='constainer my-5 text-teal-800'>
            <div className='grid'>
                <div className='flex flex-col items-center'>
                    <h1 className='text-4xl my-3'>404 - Not Found page</h1>
                    <p className='my-3'>Sorry, We couldn&apos;t find any results for this search.</p>
                    <Link to='/' className='my-3'>Back to the homepage...</Link>
                </div>
            </div>
        </div>
    )
}

export default NotFound
