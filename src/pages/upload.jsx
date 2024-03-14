import React, { useEffect, useState } from "react";
import { storage, app } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { firestoreDb } from "../firebase";
import { onAuthStateChanged, getAuth } from "firebase/auth";
const Upload = () => {
  const [user, setUser] = useState();
  const [img, setImg] = useState(null);
  const [txt, setTxt] = useState(null);
  const [data, setData] = useState([]);
  const auth = getAuth(app);
  const uploadImage = (e) => {
    console.log(e.target.files[0]);
    const imgref = ref(storage, `proof/${v4()}`);
    uploadBytes(imgref, e.target.files[0]).then((data) => {
      console.log(data, "imgs");
      getDownloadURL(data.ref).then((val) => {
        setImg(val);
      });
    });
  };
  const handleClick = async () => {
    const valueRef = collection(firestoreDb, "posts");
    await addDoc(valueRef, { caption: txt, proof: img , userMail : user.email , userName : user.displayName });
    alert("Post added sucessfully");
  };
  const getData = async () => {
    const valueRef = collection(firestoreDb, "posts");
    const dataDb = await getDocs(valueRef);
    const allData = dataDb.docs.map((val) => ({ ...val.data(), id: val.id}));
    setData(allData);
    console.log(dataDb);
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        getData();
        console.log(user.displayName);
      } else {
        setUser(null);
        console.log("You need to log in first");
      }
    });
  }, []);
  if (user) {
    return (
      <>
        <br />
        <h1>Need Help {user.displayName} ? Upload a Post 👇</h1>
        <br />
        <input type="file" onChange={(e) => uploadImage(e)} />
        <input
          onChange={(e) => setTxt(e.target.value)}
          placeholder="Enter Caption"
        ></input>
        <button onClick={(uploadImage, handleClick)}>Create Post</button>
        <h1>Recent Need Posts Near Your Area - </h1>
        {data.map((value) => (
          <div>
            <img src={value.proof} height="400px" width="400px" alt="" />
            <h3>Details - {value.caption}</h3>
            <h3>Post By - {value.userMail}</h3>
          </div>
        ))}
      </>
    );
  } else {
    return (
      <>
        <h1>You Need To Log In First</h1>
      </>
    );
  }
};

export default Upload;
