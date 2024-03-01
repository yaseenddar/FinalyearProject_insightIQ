import React, { useEffect, useRef, useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../src/firebase";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../userSlice/userSlice";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../Pages/Loader/Loader";

export default function Login() {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const handleSubmit = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        setLoading(true);
        console.log("result", result);
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

  // create new ACCOUNT 

  const createNewAcc = () =>{
    navigate("/register")
  }
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const body = {
        userEmail: email.current.value,
        password: password.current.value,
      };
      const res = await axios.post("/api/auth/login", body);
      console.log("login response", res.data.user);
      dispatch(login(res.data.user,
      ));
     console.log("user in ogin page",user)
      navigate('/');      
    } catch (error) {
      alert("error occured");
      console.log("error is", error);
    }
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

                <input
                  type="Password"
                  minLength="6"
                  placeholder="password"
                  required
                  ref={password}
                  className="loginInput  h-[50px] rounded-md border-2 border-solid
			    		            focus:outline-0 border-gray-300 text-lg pl-5"
                />

                <button
                  className="inputButton h-[50px] rounded-md border-none
			    		 text-[20px] text-white font-bold cursor-pointer bg-violet-500 hover:bg-violet-400  "
                >
                  login
                </button>

                <span className="inputForgot text-center text-[#66CDAA] cursor-pointer ">
                  forgot password
                </span>
               
              </form>
              <button
                  className="registerButton w-[50%] h-[50px] rounded-md border-none
			    		 text-[20px] text-white font-bold hover:bg-green-400 self-center cursor-pointer bg-green-500"
               onClick={()=>navigate("/register")}
                >
                  Crate a New Account
                </button>
              <hr className="m-4 p-[1px] bg-slate-400" />
              <span className="self-center mb-3">OR</span>

              <div 
			  onClick={handleSubmit} 
			  className="border-2 shadow-sm rounded-xl bg-slate-600 flex justify-center hover:bg-slate-700  cursor-pointer ">
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
    </>
  );
}
