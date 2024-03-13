import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../firebase";

const googleProvider = new GoogleAuthProvider();
const auth = getAuth(app);
const signUpWithGoogle = () => {
  signInWithPopup(auth, googleProvider);
};

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password).then((value) =>
      alert("sucess")
    );
  };
  return (
    <div className="signup-page">
      <h2>Sign Up</h2>
      <label>Email</label>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        required
        placeholder="Enter Email"
      />
      <label>Password</label>
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        required
        placeholder="Enter Password"
      />
      <button onClick={createUser}>Sign Up</button>
      <br></br>
      <br />
      <button onClick={signUpWithGoogle}>SignUp With Google</button>
    </div>
  );
};

export default SignUpPage;
