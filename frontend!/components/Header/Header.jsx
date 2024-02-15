import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import { Avatar, Button, Input } from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import PeopleIcon from "@mui/icons-material/People";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "./Header.css";
import CloseIcon from "@mui/icons-material/Close";
import axios from 'axios';
export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalClose, setIsModalClose] = useState(true);
  const [inputUrl, setInputUrl] = useState("");
  const [question, setQuestion] = useState("");

  const submitHandler= async ()=>{
    if(question){
      try {
        const body = {
          questionName: question,
          questionUrl: inputUrl,
          
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

  const pageChange=()=>{
  }

  return (
    <div className="qHeader flex bg-white justify-center items-center z-50 sticky top-0 shadow-md p-[3px] ">
      <div className="qHeader-content flex items-center justify-between gap-x-2">
        <div className="qHeader__logo ">
          <img
            className="h-[30px] object-contain cursor-pointer"
            src=""
            alt="logo"
          />
        </div>
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
          <Avatar />
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
          <Avatar src={""} className="avatar" />
          <div className="modal__scope">
            <PeopleIcon/>
            <p>Public</p>
            <KeyboardArrowDownIcon/>
          </div>
        </div>
        <div className="modal__Field">
          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            type=" text"
            placeholder="Start the discussion "
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              style={{
                margin: "5px 0",
                border: "1px solid lightgray",
                padding: "10px",
                outline: "2px solid #000",
              }}
              placeholder="Optional: inclue a link that gives context"
            />
            {inputUrl !== "" && (
              <img
                style={{
                  height: "40vh",
                  objectFit: "contain",
                }}
                src={inputUrl}
                alt="displayimage"
              />
            )}
          </div>
        </div>
        <div className="modal__buttons">
          <button className="cancle" onClick={() => setIsModalOpen(false)}>
            Cancel
          </button>
          <button type="submit" onClick={submitHandler} className="add">
            Add Discussion
          </button>
        </div>
      </Modal>
    </div>
  );
}
