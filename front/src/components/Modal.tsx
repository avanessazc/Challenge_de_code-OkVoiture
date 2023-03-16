type Props = {
    setShowModal: (open: boolean) => void
}
const Modal = ({ setShowModal }: Props) => {
    return (
        <div>
            <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
                <div className='relative w-auto my-6 mx-auto max-w-3xl'>
                    {/* content */}
                    <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                        {/* header */}
                        <div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t'>
                            <h3 className='text-stone-700 text-xl font-semibold'>Book</h3>
                        </div>
                        {/* body */}
                        <div className='relative p-6 flex-auto'>
                            <p className='my-4 text-slate-500 text-lg leading-relaxed'>
                                Start Date:
                            </p>
                            <p className='my-4 text-slate-500 text-lg leading-relaxed'>End Date:</p>
                        </div>
                        {/* footer */}
                        <div className='flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b'>
                            <button
                                className='text-pink-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                                type='button'
                                onClick={() => setShowModal(false)}
                            >
                                Close
                            </button>
                            <button
                                className='bg-yellow-600 my-4 hover:bg-pink-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline'
                                type='button'
                                onClick={() => setShowModal(false)}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
        </div>
    )
}

export default Modal
