import React from "react";
import { auth, provider } from "../firebase-config.js";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const Auth = ({ setIsAuth }) => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="auth">
      <p className="sh">Its My demo Web App</p>
      <p className="st">Sign in with Google to continue</p>
      <button onClick={signInWithGoogle} className="signb">Sign in with Google</button>
    </div>
  );
};

export default Auth;
