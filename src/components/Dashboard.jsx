import React from 'react'
import Navbar from './Navbar'
const Dashboard = () => {
    return (
        <div className=' w-full h-screen'>
            <Navbar />
            <div className=' w-full h-full bg-slate-300'>
                <div className='w-full h-96  flex justify-evenly'>
                    <div className='w-2/4 h-full bg-slate-200  flex '>
                        <div className='h-full w-2/4 flex-col items-center justify-center bg-slate-100'>
                            <h1>Start a new doc</h1>
                            <div className='h-3/4 w-full bg-white'>sad</div>
                        </div>
                        <div className='h-full w-2/4 bg-black'>
                            sad
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Dashboard
