import React from "react";
import { signInWithPopup } from "firebase/auth";
import {auth, provider} from '../../src/firebase'
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../userSlice/userSlice";


function Login() {
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        console.log("resutl is ",result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="login-container">
      <div className="login-content">
        <img
          src=""
          alt="logo"
        />
        <button onClick={handleSubmit} className="btn-login">
          Login to continue
        </button>
      </div>
    </div>
  );
}

export default Login;
