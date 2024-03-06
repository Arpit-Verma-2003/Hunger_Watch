import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../firebase";
import SignUpPage from "./signup";
import SignInPage from "./signin";
import FireStorepg from "./fireStore";

const auth = getAuth(app);

function AfterSign() {
  const [user, setUser] = useState();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log(user);
      } else {
        setUser(null);
      }
    });
  }, []);
  if (user) {
    return (
      <>
        <h1>Hello {user.email}</h1>
        <button onClick={() => signOut(auth)}>Signout</button>
      </>
    );
  }
  return (
    <>
      <h1>Hunger Watch</h1>
      <SignUpPage />
      <SignInPage />
    </>
  );
}
export default AfterSign;
