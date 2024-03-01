import React from 'react'
import './loader.css'
export default function () {
  return (
    <div className='flex flex-col h-[100vh] w-[100vw] items-center justify-center bg-black'> 
        <div className='flex gap-7'>
          <span className='text-xl text-white  font-semibold'>Loading</span>
        <span className='loader '></span>
        </div>
        

    </div>
  )
}
