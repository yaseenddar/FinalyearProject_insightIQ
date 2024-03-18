import { Avatar } from '@mui/material'
import React from 'react'
import './FeedBox.css'
import { useSelector } from 'react-redux';
export default function FeedBox() {
  const user = useSelector(state => state.user.user);


  
  return (
    <div className='Box w-full flex'>
      <div className="info ">
        <Avatar src={'public/images/1709151586616-WIN_20230823_18_12_49_Pro.jpg'} />
      </div>
      <div className="Box__feed">
        <h5 className='font-semibold'>What is in your mind?</h5>
      </div>
    </div>
  )
}
