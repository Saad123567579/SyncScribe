import React, { useState } from 'react'
import Navbar from './Navbar'
import { useEffect } from "react";
import { useDispatch ,useSelector } from "react-redux";
import { setUser } from '../redux/authSlice';
import { useNavigate } from 'react-router';
const Dashboard = () => {
    const allUsers = useSelector((state)=>state?.auth?.allUsers);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const doTask = async() => {
            let user = JSON.parse(localStorage.getItem("userObject"));
        // if(!user) window.location.href = "/";
        if(!user) navigate("/");
        await dispatch(setUser(user));
        }
        return () => doTask();

        
    
    }, [dispatch,navigate])
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
    const handleName = async(text) => {
            
    }

    return (
        <div className='w-full h-screen'>
            <Navbar />
            <div className='w-full h-screen bg-slate-100'>
                <div className='w-3/4 h-3/5 md:h-96 md:w-full flex justify-evenly'>
                    <div className='w-full md:w-2/4 h-full bg-slate-100 flex'>
                        <div className='h-full w-full md:w-2/4 flex-col items-center justify-center bg-slate-100'>
                            <h1 className='font-bold ml-2 text-lg md:text-xl mt-4'>Start a new doc</h1>
                            <div onClick={() => openModal()} className='h-3/4 w-3/4 md:w-2/4 bg-white ml-2 flex justify-center items-center cursor-pointer hover:shadow-lg rounded-lg'>
                                <svg className="w-6 h-6 text-blue-500 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <h1 className='text-4xl font-bold mt-4 flex justify-center'>My Docs</h1>
                <div className="w-full h-auto md:h-96 flex-col items-center justify-start mt-4 flex bg-slate-100">
                    <div className='w-full md:w-2/4 flex mt-2 mb-2 cursor-pointer hover:bg-slate-200 rounded-lg p-2'>
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
                    <div className='bg-white rounded-lg flex-col m-0 w-4/5 md:w-1/5 p-4'>
                        <button onClick={() => closeModal()}>
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                        <div>
                            <label htmlFor="name" className='text-xl font-semibold'>Document Name</label>
                            <input type="text" id="name" placeholder='Name your document' className='p-2 rounded-xl border-2 border-black mt-2 w-full' />
                        </div>
                        <div>
                            <label htmlFor="users" className='text-xl font-semibold'>Name your document</label>
                            <input type="text" id="users" placeholder='Name your document' className='p-2 rounded-xl border-2 border-black mt-2 w-full' />
                        </div>
                        <button className='rounded-lg p-2 bg-blue-600 hover:bg-blue-500 mt-2' onClick={() => handleName(document.getElementById("name").value)}>
                            Create
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
