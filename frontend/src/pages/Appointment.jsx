import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets';



const Appointment = () => {

  const { docId } = useParams()
  const { doctors, currencySymbol } = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']


  const [docInfo, setDocInfo] = useState('')
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')


  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
    // console.log(docInfo)
  }

  const getAvailableSlot = async () => {
    setDocSlots([])

    // getting current 
    let today = new Date()
     
    for(let i = 0; i < 7; i++) {
      // getting date with index 
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)
      console.log(currentDate)

      // let currentDate = new Date()
      // currentDate.setDate(currentDate.getDate() + i)
      // console.log(currentDate)
      {/*Also correct form*/ }

      //setting end time of the date with index

      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21,0,0,0)

      //setting hours

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ?  30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        //add slot to array
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime 
        })
        //Increase current time by 30 min
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setDocSlots(prev => ([...prev, timeSlots ]))
    }
  }

  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    getAvailableSlot()
  }, [docInfo])

  useEffect(() => {
    console.log(docSlots)
    
  }, [docSlots])

  return docInfo && (
    /*Above line states if doctor info is available then render the code below */
    <div className='mt-8'>
      {/*Doctor Details*/}
      <div className='flex flex-col sm:flex-row gap-4'  >
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt='' />
        </div>
        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {docInfo.name}
            <img src={assets.verified_icon} alt='' />
          </p>
          <div className='flex gap-2 font-light mt-2'>
            <p> {docInfo.degree} - {docInfo.speciality}</p>
            <p className='border border-gray-400 py-1 px-3 text-sm    rounded-full'>{docInfo.experience}</p>
          </div>
          <div>
            <p className='flex gap-2 mt-4'>
              About <img src={assets.info_icon} alt='' />
            </p>
            <p className='mt-1 text-gray-600'>{docInfo.about}</p>
          </div>
          <div className='mt-3 text-lg'>
            <p className='text-gray-600'>Appointment fee: <span className='text-gray-900'>{currencySymbol}{docInfo.fees}</span> </p>
          </div>
        </div>
      </div>

      {/*Booking Slots */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking Slots</p>
      
      <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
        {docSlots.length && docSlots.map((item,index) => {
          return (
          <div onClick={()=> setSlotIndex(index)} className={`text-center py-6 min-w-14 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`} key={index}>
            <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
            <p>{item[0] && item[0].datetime.getDate()}</p>
          </div>)
        })}
      </div>
      <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
        {docSlots.length && docSlots[slotIndex].map((item,index)=> (
          <p onClick={()=> setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`} key={index}>
            {item.time.toLowerCase()}
          </p>
        ))}
      </div>
      <button className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book an appointment</button>
      </div>

<div>
  {/* <RelatedDoctors/> */}
</div>
    </div>
  )
}

export default Appointment
