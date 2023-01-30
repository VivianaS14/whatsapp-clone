import { Button } from "@mui/material";
import React from "react";
import "./Login.css";
import { auth, provider } from "../api/firebase";
import { signInWithPopup } from "firebase/auth";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer";

const Login = () => {
  const [{}, dispatch] = useStateValue();

  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      dispatch({
        type: actionTypes.SET_USER,
        user: result.user,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2504/2504845.png"
          alt="WhatsApp Logo"
        />
        <div className="login__text">
          <h1>Sign in to WhatsApp</h1>
        </div>
        <Button onClick={signIn}>Sign In With Google</Button>
      </div>
    </div>
  );
};

export default Login;
