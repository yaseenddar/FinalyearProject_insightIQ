import { Avatar } from '@mui/material'
import React from 'react'
import './FeedBox.css'
export default function FeedBox() {
  return (
    <div className='Box w-full'>
          <div className="info">
        <Avatar  />
      </div>
      <div className="Box__feed">
        <h5>What is your question or link?</h5>
      </div>
    </div>
  )
}
