import React, { useState } from 'react'
import Header from '../Header/Header'
import Feed from '../Feed/Feed'
import './Home.css'
import Loader from '../Pages/Loader/Loader'
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
export default function Home() {
  const [loading,setLoading] = useState(true);
  setTimeout(()=>{
    setLoading(false);
    // toast("")
  },2000)
  return (
    <div className="">
    <Header />
    <ToastContainer/>
    <div className="">
      <div className=" ">
        {/* <Sidebar /> */}
      {  loading ? < Loader/>:<Feed/>}
        {/* <Widget /> */}
      </div>
    </div>
  </div>
  )
}
