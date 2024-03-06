import React , {useState} from "react";
import {getAuth,signInWithEmailAndPassword} from 'firebase/auth';
import {app} from "../firebase";

const auth = getAuth(app);

const SignInPage = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const signInUser = ()=>{
        signInWithEmailAndPassword(auth,email,password).then(value=>alert('sucess')).catch((err)=>console.log('error'));
    }
    return (
        <div className="signin-page">
            <h2>Sign In Here</h2>
            <label>Email</label>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="email daal" type="email"></input>
            <label>Password</label>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} placeholder="password daal" type="password"></input>
            <button onClick={signInUser}>Sign Me In</button>
        </div>
    );
};

export default SignInPage;