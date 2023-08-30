import React from 'react';

const Navbar = () => {
    return (
        <div className='flex flex-wrap items-center justify-between w-full h-16 p-4  bg-gray-100 dark:bg-gray-800'>
            <div className='flex items-center'>
                <div className='text-4xl text-gray-800 mb-2 dark:text-white mr-2'>
                    <svg className='w-10 h-10' aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeWidth="2" d="M3 8v10a1 1 0 0 0 1 1h4v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5h4a1 1 0 0 0 1-1V8M1 10l9-9 9 9" />
                    </svg>
                </div>
                <div className='text-4xl text-gray-800 mb-2 dark:text-white mr-2'>
                    <svg className='w-10 h-10' aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
                        <path stroke="currentColor" strokeWidth="2" d="M4.828 10h6.239m-6.239 4h6.239M6 1v4a1 1 0 0 1-1 1H1m14-4v16a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2Z" />
                    </svg>
                </div>
                <h1 className='font-bold text-4xl mb-2'>Mydoc</h1>
            </div>
            <div className='flex items-center '>
                <img className='rounded-full w-12 h-12' alt="img" src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg" />
            </div>
            
           
        </div>
    );
};

export default Navbar;
