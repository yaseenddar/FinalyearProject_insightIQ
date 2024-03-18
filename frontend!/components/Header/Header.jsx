import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import { Avatar, Button, Input } from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import ReactQuill from "react-quill";
import PeopleIcon from "@mui/icons-material/People";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "./Header.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../userSlice/userSlice";
import { useNavigate } from "react-router-dom";
import { auth } from "../../src/firebase";
import { signOut } from "firebase/auth";
import Profile from "../Pages/Profile";
import { Link } from "react-router-dom";

export default function Header() {
  const URL = "http://localhost:4000/uploads/";

  const user = useSelector((state) => state.user.user);
  const profilePicture = user.profilePicture;
  // console.log(user);
  // console.log("user in post",user)
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalClose, setIsModalClose] = useState(true);
  const [inputUrl, setInputUrl] = useState("");
  const [question, setQuestion] = useState("");
  const [isLogoutModelOpen, setIsLogoutModelOpen] = useState(false);
  const navigate = useNavigate();
  const submitHandler = async () => {
    if (question) {
      try {
        const body = {
          questionName: question,
          user: user,
          googleLogin: user.googleLogin || false,
        };
        const res = await axios.post("/api/questions", body);
        console.log(res.data);
        if (res.data) {
          setIsModalOpen(false);
          alert("shared successfully");
          window.location.href = "/";
        }
      } catch (error) {
        console.log("error occured");
      }
    }
  };
  //
  const avtarhandler = () => {
    return <Profile />;
  };
  const handleQuill = (value) => {
    setQuestion(value);
  };
  const pageChange = () => {};
  const logoutHandle = () => {
    setIsLogoutModelOpen(true);
    // if(window.confirm("Are you sure to logout!")){
    //   signOut(auth).then(()=>{
    //     // console.log("user",user);

    //     console.log("logged out")
    //     console.log("user",user);

    //   }).catch((err)=>{
    //     console.log("Error occured")
    //   })
    //   dispatch(logout());
    //   localStorage.removeItem('token');
    // }
  };

  //logout handler
  const confirmLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("user", user);
        console.log("logged out");
        console.log("user", user);
      })
      .catch((err) => {
        console.log("Error occured");
      });
    dispatch(logout());
    localStorage.removeItem("token");
    setIsLogoutModelOpen(false);
  };

  const avtarHandler = () => {
    return <Profile />;
  };
  return (
    <div className="w-full flex bg-slate-300 rounded-2xl justify-center items-center z-40 sticky top-0 shadow-md p-[3px] ">
      <div className="qHeader-content flex items-center justify-between gap-x-2">
        <Link to={"/"}>
          <img
            className="h-[70px] w-[200px] cursor-pointer"
            src="../../src/assets/logo.png"
            alt="logo"
          />
        </Link>
        <div className="qHeader__icons flex gap-5">
          <Link to={"/"}>
            <div className="qHeader__icon cursor-pointer p-[5px] hover:bg-[#eee] rounded-md">
              <HomeIcon />
            </div>
          </Link>
          <div className="qHeader__icon cursor-pointer p-[5px] hover:bg-[#eee] rounded-md">
            <ReceiptLongIcon />
          </div>
          <div className="qHeader__icon cursor-pointer p-[5px] hover:bg-[#eee] rounded-md">
            <CircleNotificationsIcon color="secondry" />
          </div>
          <div className="qHeader__icon cursor-pointer p-[5px] hover:bg-[#eee] rounded-md">
            <PeopleIcon />
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
          <Link to={`/profile/${user._id}`}>
            <Avatar
              src={
                user.googleLogin
                  ? user.profilePicture
                  : `${URL}` + user.profilePicture
              }
              onClick={() => avtarhandler}
            />
          </Link>
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
            <PeopleIcon />
            <p>Public</p>
            <KeyboardArrowDownIcon color="primary" />
          </div>
        </div>
        <div className="modal__Field">
          <ReactQuill
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

      <button
        type="submit"
        onClick={logoutHandle}
        className=" bg-red-500 text-lg ml-2 p-1 rounded-md text-white hover:bg-red-400"
      >
        LOGOUT
      </button>

      {/* // logout models */}
      {isLogoutModelOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black opacity-50 blur z-40"
            onClick={() => setIsLogoutModelOpen(false)} // Close modal when clicking outside
          ></div>
          <div className="bg-white rounded-lg shadow-lg p-8 mx-4 md:mx-auto max-w-md z-50">
            <h2 className="text-xl font-bold mb-4">Confirm Logout</h2>
            <p className="mb-4">Are you sure you want to log out?</p>
            <div className="flex justify-end">
              <button
                className="bg-red-500 hover:bg-red-600 text-white rounded px-4 py-2 mr-2"
                onClick={confirmLogout}
              >
                Confirm
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 rounded px-4 py-2"
                onClick={() => setIsLogoutModelOpen(false)} // Close modal when Cancel button is clicked
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
