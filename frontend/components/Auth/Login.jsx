import React, { useEffect, useRef, useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../src/firebase";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Slices/userSlice";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../Pages/Loader/Loader";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
export default function Login() {
  const user = useSelector((state) => state.user.user);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalClose, setIsModalClose] = useState(true);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [message,setMessage] = useState("");

  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  setTimeout(() => {
    setLoading(false);
  }, 2000);
  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();
  const oldPassword = useRef();
  const newPassword = useRef();
  const confirmNewPassword = useRef();
  const Email = useRef();

  const jwtToken = localStorage.getItem("token");
  // console.log("token in login page",jwtToken)
  // create new ACCOUNT
  if (jwtToken) {
    const tokenLogin = async () => {
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
      const res = await axios.post("/api/auth/login");
      // console.log("login response through token", res.data);
      dispatch(login(res.data.user));
    };
    tokenLogin();
  }
  const createNewAcc = () => {
    navigate("/register");
  };
  const handleClick = async (e) => {
    e.preventDefault();
   
    try {
      const body = {
        userEmail: email.current.value,
        password: password.current.value,
      };
      // jwtToken check

      const res = await axios.post("/api/auth/login", body);
      // console.log("login response through api body", res.data.user);
      const token = res.data.token;
      if (res.data.errors) {
        setError(res.data.message);
      }
      localStorage.setItem("token", token);
      dispatch(login(res.data.user));
      //  console.log("user in ogin page",user)
      navigate("/");
    } catch (error) {
      // alert("error occured");
      console.log("error is", error.response.data);
      setError(error.response.data.message);
    }
  };

  // change password handler

  const passwordChangeHandler = async (e) => {
    e.preventDefault();
    setLoading1(true);


    const body = {
      userEmail: Email.current.value,
      oldPassword: oldPassword.current.value,
      newPassword: newPassword.current.value,
    };
    if (newPassword.current.value !== confirmNewPassword.current.value) {
     setMessage("password don't match");
    } else {
    await axios.post("/api/auth/changepassword", body)
    .then((res)=>{
      console.log("response",res.data)
      setMessage(res.data.message)
    })
    .catch((error)=>{
      setMessage(error.response.data.message)

    })
    }
    setLoading1(false);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="login  w-full h-[100vh] bg-slate-400 backdrop-filter flex items-center justify-center ">
          <div className="loginwrapper w-[60%] h-[90%] flex   bg-slate-400   rounded-lg shadow-xl shadow-slate-950">
            <div className="loginleft w-[10px] flex-1 flex flex-col justify-center">
              <h3 className="loginLogo  animate-pulse text-[90px] text-purple-700 tracking-wider">
                InsigtIQ
              </h3>
              <img src="" alt="" />

              <span className="text-2xl tracking-wider text-blue-800">
                coonect to world on InsightIQ.
              </span>
            </div>
            <div className="loginRight  flex-1 flex flex-col justify-center ">
              <form
                onSubmit={handleClick}
                className="loginBox h-[300px] p[20px] bg-slate-400 mb-2 shadow-lg shadow-cyan-800
			    	                                         rounded-md flex flex-col justify-between p-3"
              >
                <input
                  type="Email"
                  className="loginInput h-[50px] rounded-md border-2 border-solid
			    		           focus:outline-0 border-gray-300 text-lg pl-5 "
                  placeholder="enter email address"
                  ref={email}
                  required
                />
                <label className="flex flex-col" htmlFor="password">
                  <input
                    type="Password"
                    minLength="6"
                    placeholder="password"
                    required
                    ref={password}
                    className="loginInput  h-[50px] rounded-md border-2 border-solid
			    		            focus:outline-0 border-gray-300 text-lg pl-5"
                  />
                  <span className="text-red-700">{error}</span>
                </label>
                <button
                onClick={handleClick}
                  className="inputButton h-[50px] rounded-md border-none
			    		 text-[20px] text-white font-bold cursor-pointer bg-violet-500 hover:bg-violet-400  "
                >
                 {loading ? "loading" : "login"} 
                </button>

                <span
                  className="inputForgot text-center text-blue-800 cursor-pointer "
                  onClick={() => setIsModelOpen(true)}
                >
                  forgot password
                </span>
              </form>
              <button
                className="registerButton w-[50%] h-[50px] rounded-md border-none
			    		 text-[20px] text-white font-bold hover:bg-green-400 self-center cursor-pointer bg-green-500"
                onClick={() => navigate("/register")}
              >
                Crate a New Account
              </button>
              <hr className="m-4 p-[1px] bg-slate-400" />
              <span className="self-center mb-3">OR</span>

              <div
                onClick={handleSubmit}
                className="border-2 shadow-sm rounded-xl bg-slate-600 flex justify-center hover:bg-slate-700  cursor-pointer "
              >
                <span className="text-xl mx-2 my-auto">
                  sign in with google
                </span>
                <img
                  className="w-[3rem]"
                  src="https://imagepng.org/wp-content/uploads/2019/08/google-icon.png"
                  alt="google login"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {isModelOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center  ">
          <div
            className="absolute inset-0 bg-black opacity-50 blur z-40"
            onClick={() => {setIsModelOpen(false);setMessage("") }} // Close modal when clicking outside
          ></div>
          <div className="bg-white rounded-lg shadow-lg p-8 mx-4 md:mx-auto max-w-md z-50  w-full ">
            <form action="" onSubmit={passwordChangeHandler} className="w-full h-full flex flex-col gap-2">
              <input
                type="Email"
                className="loginInput h-[50px] rounded-md border-2 border-solid
			    		           focus:outline-0 border-gray-300 text-lg pl-5"
                placeholder="email address"
                ref={Email}
                required
              />
              <input
                type="Password"
                minLength="6"
                placeholder="old password"
                required
                ref={oldPassword}
                className="loginInput  h-[50px] rounded-md border-2 border-solid
			    		            focus:outline-0 border-gray-300 text-lg pl-5"
              />
              <input
                type="Password"
                minLength="6"
                placeholder="new password"
                required
                ref={newPassword}
                className="loginInput  h-[50px] rounded-md border-2 border-solid
			    		            focus:outline-0 border-gray-300 text-lg pl-5"
              />
              <input
                type="Password"
                minLength="6"
                placeholder="confirm new password"
                required
                ref={confirmNewPassword}
                className="loginInput  h-[50px] rounded-md border-2 border-solid
			    		            focus:outline-0 border-gray-300 text-lg pl-5"
              />
              <span className="text-red-700">{message && message}</span>
              <button className="bg-blue-600 hover:bg-blue-500 text-white rounded px-4 py-2 mr-2">{loading1 ? "loading..." :"confirm"}</button>
            </form>

          </div>
        </div>
      )}
    </>
  );
}
