import React, { useState } from 'react'
import Navbar from './Navbar'
const Dashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    document.addEventListener('click', (event) => {
        if (event.target.getAttribute('id') === "modal") { closeModal() }
    })
    return (
        <div className=' w-full h-screen'>
            <Navbar />
            <div className=' w-full h-screen bg-slate-100'>
                
                <div className='w-full h-96  flex justify-evenly'>
                    <div className='w-2/4 h-full bg-slate-100  flex '>
                        <div className='h-full w-2/4 flex-col items-center justify-center bg-slate-100'>
                            <h1 className='font-bold ml-2 text-xl' >Start a new doc</h1>
                            <div onClick={() => openModal()} className='h-3/4 w-2/4 bg-white ml-2 flex justify-center items-center cursor-pointer hover:shadow-lg'>
                                <svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                </svg>
                            </div>
                        </div>
                        <div className='h-full w-2/4 flex m-auto flex-col items-center justify-start overflow-y-auto'>
                            <h1 className='text-xl font-bold'>Shared With Me</h1>
                            <div className="flex cursor-pointer rounded-lg p-2 hover:bg-slate-300 mt-2">
                                <img className='h-6 w-6 ' alt="img" src="https://mailmeteor.com/logos/assets/PNG/Google_Docs_Logo_512px.png" />
                                <h1 className="ml-2 font-semibold text-lg">Doc1</h1>
                            </div>
                            <div className="flex cursor-pointer rounded-lg p-2 hover:bg-slate-300 mt-2">
                                <img className='h-6 w-6 ' alt="img" src="https://mailmeteor.com/logos/assets/PNG/Google_Docs_Logo_512px.png" />
                                <h1 className="ml-2 font-semibold text-lg">Doc1</h1>
                            </div>
                            <div className="flex cursor-pointer rounded-lg p-2 hover:bg-slate-300 mt-2">
                                <img className='h-6 w-6 ' alt="img" src="https://mailmeteor.com/logos/assets/PNG/Google_Docs_Logo_512px.png" />
                                <h1 className="ml-2 font-semibold text-lg">Doc1</h1>
                            </div>
                            <div className="flex cursor-pointer rounded-lg p-2 hover:bg-slate-300 mt-2">
                                <img className='h-6 w-6 ' alt="img" src="https://mailmeteor.com/logos/assets/PNG/Google_Docs_Logo_512px.png" />
                                <h1 className="ml-2 font-semibold text-lg">Doc1</h1>
                            </div>
                            <div className="flex cursor-pointer rounded-lg p-2 hover:bg-slate-300 mt-2">
                                <img className='h-6 w-6 ' alt="img" src="https://mailmeteor.com/logos/assets/PNG/Google_Docs_Logo_512px.png" />
                                <h1 className="ml-2 font-semibold text-lg">Doc1</h1>
                            </div>
                            <div className="flex cursor-pointer rounded-lg p-2 hover:bg-slate-300 mt-2">
                                <img className='h-6 w-6 ' alt="img" src="https://mailmeteor.com/logos/assets/PNG/Google_Docs_Logo_512px.png" />
                                <h1 className="ml-2 font-semibold text-lg">Doc1</h1>
                            </div>
                            <div className="flex cursor-pointer rounded-lg p-2 hover:bg-slate-300 mt-2">
                                <img className='h-6 w-6 ' alt="img" src="https://mailmeteor.com/logos/assets/PNG/Google_Docs_Logo_512px.png" />
                                <h1 className="ml-2 font-semibold text-lg">Doc1</h1>
                            </div>
                            <div className="flex cursor-pointer rounded-lg p-2 hover:bg-slate-300 mt-2">
                                <img className='h-6 w-6 ' alt="img" src="https://mailmeteor.com/logos/assets/PNG/Google_Docs_Logo_512px.png" />
                                <h1 className="ml-2 font-semibold text-lg">Doc1</h1>
                            </div>

                        </div>
                    </div>
                </div>

                <h1 className='text-4xl font-bold mt-4 flex justify-center '>My Docs</h1>

                <div className="w-full h-96 flex-col items-center justify-start mt-4 flex bg-slate-100">

                    <div className='w-2/4 flex mt-2 mb-2 cursor-pointer hover:bg-slate-200 rounded-lg p-2'>

                        <div className='w-2/4 flex justify-center'>
                            <img className='h-6 w-6 ' alt="img" src="https://mailmeteor.com/logos/assets/PNG/Google_Docs_Logo_512px.png" />
                            <h1 className='text-lg font-semibold ml-2'>Doc name</h1>
                        </div>
                        <div className='w-2/4 flex justify-center'>12/2/2020</div>
                    </div>

                </div>
            </div>
            {isModalOpen && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 w-full h-full' id="modal">
                    <div className='bg-white rounded-lg flex-col m-0 w-1/5 p-4'>
                        <button onClick={() => closeModal()}>
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                        <div>
                            <label htmlFor="name"  className='text-xl font-semibold'>Name your document</label>
                            <input type="text" id="name" placeholder='Name your document' className='p-2 rounded-xl b-2 border-black mt-2' />
                        </div>
                        <button className='rounded-lg p-2 bg-blue-600 hover:bg-blue-500 mt-2'
                        
                        onClick={()=>console.log(document.getElementById("name").value)}
                        >create
                        </button>
                    </div>
                </div>
            )}

        </div >
    )
}

export default Dashboard
