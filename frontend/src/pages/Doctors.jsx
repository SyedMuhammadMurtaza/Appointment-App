import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {AppContext} from '../context/AppContext'

const Doctors = () => {

  const navigate = useNavigate()

  const {speciality} = useParams()
  const [filterDoc, setFilterDoc] = useState([]);

  const {doctors} = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(item => item.speciality === speciality))
      // setFilterDoc(doctors.filter((item)=>(item.speciality === speciality)))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  },[doctors,speciality])

  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors speciality.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <div className='flex flex-col gap-4 text-sm text-gray-600'>
          <p onClick={()=> speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} className={`w-[100%] pl-3 pr-11 py-2 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'General physician' ? 'bg-indigo-100' : ''}`}>General physician</p>
          <p onClick={()=> speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[100%] pl-3 pr-11 py-2 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Gynecologist' ? 'bg-indigo-100' : '' }`}>Gynecologist</p>
          <p onClick={()=> speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[100%] pl-3 pr-11 py-2 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Dermatologist' ? 'bg-indigo-100' : ''}`}>Dermatologist</p> 
          <p onClick={()=> speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`w-[100%] pl-3 pr-11 py-2 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Pediatricians' ? 'bg-indigo-100' : ''}`}>Pediatricians</p>
          <p onClick={()=> speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-[100%] pl-3 pr-11 py-2 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Neurologist' ? 'bg-indigo-100' : ''}`}>Neurologist</p>
          <p onClick={()=> speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className={`w-[100%] pl-3 pr-11 py-2 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Gastroenterologist' ? 'bg-indigo-100' : ''}`}>Gastroenterologist</p>
        </div>
        <div className='w-full grid grid-cols-4 gap-4 gap-y-6'>
          {filterDoc.map((item, index) => (
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
      </div>

    </div>
  )
}

export default Doctors
