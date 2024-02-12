import React from 'react'
import Header from '../Header/Header'
import Widget from '../Widget/Widget'
import Feed from '../Feed/Feed'
import Sidebar from '../Sidebar/Sidebar'
import './Home.css'
export default function Home() {
  return (
    <div className="home ">
    <Header />
    <div className="contents bg-red-600 w-[100%]">
      <div className="content  ">
        <Sidebar />
        <Feed />
        <Widget />
      </div>
    </div>
  </div>
  )
}
