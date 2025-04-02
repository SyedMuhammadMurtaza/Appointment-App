import React, { useContext } from 'react'
import {useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const TrustedDoctors = () => {
  const navigate = useNavigate();
  const {doctors} = useContext(AppContext);
  return (
    <div>
      <div className='flex flex-col items-center gap-4 my-10 text-gray-900 md:mx-10'>
        <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
        <p className='sm:w-1/3 sm:px-8 md:w-full text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
      </div>

      {/*Top Doctors Section */}
      <div className='grid sm:grid-flow-row p-8 md:grid-cols-5 items-center gap-4  '>
        {doctors.slice(0, 10).map((item, index) => (
          <div key={index} onClick={()=> navigate(`/appointment/${item._id}`)} className='border border-gray-200 rounded-lg cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
            <img className='bg-[#EAEFFF] ' src={item.image} alt=''></img>
            <div className='py-3 px-3'>
              <div className='flex items-center gap-2 text-green-500 text-sm'>
                <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
              </div>
              <h2 className='font-medium tracking-tight'>{item.name}</h2>
              <p className='font-light text-sm'>{item.speciality}</p>
            </div>
          </div>
        ))}



      </div>
      <div className='flex justify-center'>
        <button onClick={()=>{navigate("/doctors"); scrollTo(0,0)}} className='bg-[#EAEFFF] text-gray-800 px-12 py-3 rounded-full mt-5'>more</button>
      </div>

    </div>
  )
}

export default TrustedDoctors
