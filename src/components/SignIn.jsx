import React from "react";

const SignIn = () => {
  const SignInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return <button onClick={SignInWithGoogle}>Sign in with Google</button>;
};

export default SignIn;
