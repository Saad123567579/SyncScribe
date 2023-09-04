import React, { useState } from 'react'
import Navbar from './Navbar'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setMyDocs } from '../redux/authSlice';
import { useNavigate } from 'react-router';
import Select from 'react-select'
import { documentRef } from '../firebase';
import { query, where, getDocs, addDoc } from 'firebase/firestore';

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allDocs = useSelector((state) => state?.auth?.myDocs);
    useEffect(() => {
        const doTask = async () => {
            let user = JSON.parse(localStorage.getItem("userObject"));
            // if(!user) window.location.href = "/";
            if (!user) navigate("/");
            const firestoreQuery1 = query(documentRef, where("host.name", "==", user.name));
            const fetchedUsers = await getDocs(firestoreQuery1);
            const allDocs = [];
            fetchedUsers.forEach((doc) => {
                allDocs.push(doc.data());
            });

            const firestoreQuery2 = query(documentRef, where("allowedUsers", "array-contains", user.name));
            const fetchedUsersAgain = await getDocs(firestoreQuery2);
            fetchedUsersAgain.forEach((doc) => {
                let d = doc.data();
                let by = d.name;
                d.sharedBy = by;
                allDocs.push(d);
            });
            // console.log('the docs are',allDocs);
            await dispatch(setMyDocs(allDocs));
            await dispatch(setUser(user));
        }
        return () => doTask();



    }, [dispatch, navigate])

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const handleSelectChange = (selectedValues) => {
        setSelectedOptions(selectedValues);
    };
    const allUsers = useSelector((state) => state?.auth?.allUsers);
    const user = useSelector((state) => state?.auth?.user)
    let options = [];
    allUsers?.map((item) => {
        let obj = { ...item, value: item.name, label: item.name };
        options.push(obj);

    })

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    document.addEventListener('click', (event) => {
        if (event.target.getAttribute('id') === "modal") { closeModal() }
    })
    function generateUniqueId() {
        const timestamp = Date.now().toString();
        const randomDigits = Math.floor(Math.random() * 100000).toString().padStart(5, '0'); // Generate 5-digit random number
        const uniqueId = timestamp + randomDigits;

        return uniqueId.substring(0, 10); // Take the first 10 digits
    }

    const handleName = async (text) => {
        let obj = {};
        obj.name = text;
        let al = selectedOptions.map((option) => option.value);
        obj.allowedUsers = al;
        obj.host = user;
        obj.uid = generateUniqueId();
        obj.createdAt = new Date();

        if (obj.name.length > 3 && obj.allowedUsers.length > 0) {
            await addDoc(documentRef, obj);
            let url = `${window.location.origin}/document/${obj.uid}`;
            window.location.href = url;


        }
        else {
            console.log("false");
        }

    }
    

    return (
        <div className='w-full h-screen bg-slate-100'>
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
                <div className="w-full h-auto md:h-96 flex-col items-center justify-start mt-4 flex bg-slate-100 overflow-y-auto">
                    {
                        allDocs?.length !== 0 ? (
                            allDocs?.map((data) => (
                                <div className='w-1/2 md:w-2/4 flex mt-2 mb-2 cursor-pointer hover:bg-slate-200 rounded-lg p-2 ' key={data.uid} onClick={()=>navigate(`/document/${data?.uid}`)} >
                                    <div className='w-2/4 flex justify-start items-center '>
                                        <img className='h-6 w-6' alt="img" src="https://mailmeteor.com/logos/assets/PNG/Google_Docs_Logo_512px.png" />
                                        <div className='text-lg font-semibold ml-2 overflow-hidden whitespace-nowrap overflow-ellipsis' style={{ maxWidth: '80%' }}>
                                            {data?.name}
                                        </div>
                                    </div>
                                    <div className='w-2/4 flex justify-end'>12/2/2020</div>
                                </div>
                            ))
                        ) : (
                            <div className='flex font-bold text-4xl'>No Docs Found</div>
                        )
                    }

                </div>
            </div>
            {isModalOpen && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 w-full h-full' id="modal">
                    <div className='bg-white rounded-lg flex-col m-0 w-4/5 md:w-1/5 p-4'>
                        <button onClick={() => closeModal()}>
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="non=e" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                        <div>
                            <label htmlFor="name" className='text-xl font-semibold'>Document Name</label>
                            <input type="text" id="name" placeholder='Name your document' className='p-2 rounded-xl border-2 border-black mt-2 w-full' />
                        </div>
                        <div className='mt-2 mb-2'>
                            <Select

                                isMulti
                                name="" Users
                                options={options}
                                id="select"
                                value={selectedOptions}
                                onChange={handleSelectChange}
                                className="basic-multi-select"
                                classNamePrefix="select"
                            />
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

//this is the first comment