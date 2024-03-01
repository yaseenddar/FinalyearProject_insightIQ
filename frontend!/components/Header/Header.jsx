import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import { Avatar, Button, Input } from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import ReactQuill from "react-quill";
import PeopleIcon from "@mui/icons-material/People";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "./Header.css";
import CloseIcon from "@mui/icons-material/Close";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../userSlice/userSlice";
import {useNavigate} from "react-router-dom"
import { auth } from "../../src/firebase";
import { signOut } from "firebase/auth";
// require('dotenv').config();
export default function Header() {
const URL = 'http://localhost:4000/uploads/';
// 

  const user = useSelector(state => state.user.user);
  const profilePicture = user.profilePicture;
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalClose, setIsModalClose] = useState(true);
  const [inputUrl, setInputUrl] = useState("");
  const [question, setQuestion] = useState("");
  const navigate = useNavigate();
  console.log("user in header",user);
  const submitHandler= async ()=>{
    if(question){
      try {
        const body = {
          questionName: question,
          questionUrl: inputUrl,
          user:user,
          googleLogin:user.googleLogin || false
          
        }
       const res =  await axios.post("/api/questions",body);
       console.log(res.data)
        if(res.data){
          setIsModalOpen(false)
          alert("shared successfully")
          window.location.href="/"
        }
      } catch (error) {
        console.log("error occured")
      }
    }

  }

  const handleQuill = (value) => {
    setQuestion(value);
  };
  const pageChange=()=>{
  }
  const logoutHandle=()=>{
    if(window.confirm("Are you sure to logout!")){
      signOut(auth).then(()=>{
        console.log("user",user);
        dispatch(logout());

        console.log("logged out")
        console.log("user",user);

      }).catch((err)=>{
        console.log("Error occured")
      })

    }
  }
  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  }
  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
  ]
  console.log("user profile",user.profilePicture)
  return (
    <div className="w-full flex bg-slate-300 rounded-2xl justify-center items-center z-50 sticky top-0 shadow-md p-[3px] ">
      <div className="qHeader-content flex items-center justify-between gap-x-2">
        
          <img
            className="h-[70px] w-[200px] cursor-pointer"
            src="../../src/assets/logo.png"
            alt="logo"
          />
      
        <div className="qHeader__icons flex gap-5">
          <div className="qHeader__icon cursor-pointer p-[5px] hover:bg-[#eee] rounded-md">
            <HomeIcon fontSize="large" color="action" />
          </div>
          <div className="qHeader__icon cursor-pointer p-[5px] hover:bg-[#eee] rounded-md">
            <ReceiptLongIcon fontSize="large" color="action" />
          </div>
          <div className="qHeader__icon cursor-pointer p-[5px] hover:bg-[#eee] rounded-md">
            <CircleNotificationsIcon fontSize="large" color="action" />
          </div>
          <div className="qHeader__icon cursor-pointer p-[5px] hover:bg-[#eee] rounded-md">
            <PeopleIcon fontSize="large" color="action" />
          </div>
        </div>
        <div className="qHeader__input flex items-center p-[5px] ml-[5px] border rounded-lg border-gray-400 ">
          <SearchIcon />
          <input
            type="text"
            placeholder="search here"
            className="bg-transparent outline-none border-none rounded-lg"
          />
        </div>
        <div className="qHeader__Rem cursor-pointer">
        {/* <Avatar src={`${URL}1709285763792-OIP (1)atomic habit.jpeg`} /> */}
        <Avatar src={ user.googleLogin ? user.profilePicture : `${URL}`+ user.profilePicture} />
        </div>

        <Button variant="contained" onClick={() => setIsModalOpen(true)}>
          add discussion
        </Button>
      </div>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        closeOnOverlayClick={false}
        center
        closeOnEsc
        styles={{
          overlay: {
            height: "auto",
          },
        }}
      >
        <div className="modal__title">
          <h5>Add Discussion</h5>
          <h5>Share Link</h5>
        </div>
        <div className="modal__info">
          <Avatar src={user.user?.photo} className="avatar" />
          <div className="modal__scope">
            <PeopleIcon/>
            <p>Public</p>
            <KeyboardArrowDownIcon/>
          </div>
        </div>
        <div className="modal__Field">
        <ReactQuill
                    modules={modules} 
                    formats={formats} 
                      value={question}
                      onChange={handleQuill}
                      placeholder="Share your thoughts"
                    />
        </div>
        <div className="modal__buttons ">
          <button className="cancle" onClick={() => setIsModalOpen(false)}>
            Cancel
          </button>
          <button type="submit" onClick={submitHandler} className="add ">
            Add Discussion
          </button>
         
        </div>
      </Modal>

      
      <button type="submit" onClick={logoutHandle} className=" bg-red-500 text-lg ml-2 p-1 rounded-md text-white hover:bg-red-400">
            LOGOUT
          </button>
          
    </div>
  );
}
