import React, { useEffect, useState, useLayoutEffect } from "react";
import { storage, app } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
  getFirestore,
} from "firebase/firestore";
import { firestoreDb } from "../firebase";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import axios from "axios";

const Upload = () => {
  const db = getFirestore(app);
  const [user, setUser] = useState();
  const [img, setImg] = useState(null);
  const [txt, setTxt] = useState(null);
  const [data, setData] = useState([]);
  const [comments, setComments] = useState({}); // Object to store comments for each post
  const [currentPostId, setCurrentPostId] = useState(null);
  const [currLocation, setCurrLocation] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
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
    const newPost = await addDoc(valueRef, {
      caption: txt,
      proof: img,
      userMail: user.email,
      userName: user.displayName,
      userLocation: currLocation.city,
    });
    setCurrentPostId(newPost.id);
    alert("Post added successfully");
  };

  const getData = async () => {
    const valueRef = collection(firestoreDb, "posts");
    const dataDb = await getDocs(valueRef);
    const allData = dataDb.docs.map(async (val) => {
      const postData = { ...val.data(), id: val.id };
      await getCommentsForPost(val.id); // Fetch comments for each post
      return postData;
    });
    const resolvedData = await Promise.all(allData);
    setData(resolvedData);
  };

  const getCommentsForPost = async (postId) => {
    const commentRef = collection(firestoreDb, "comments");
    const q = query(commentRef, where("postId", "==", postId));
    const snapshot = await getDocs(q);
    const postComments = snapshot.docs.map((doc) => doc.data());
    setComments((prevComments) => ({
      ...prevComments,
      [postId]: postComments,
    }));
  };

  const getDocumentsByQuery = async () => {
    try {
      const collectionRef = collection(firestoreDb, "posts");
      const q = query(
        collectionRef,
        where("userLocation", "==", currLocation.city)
      );
      const snapShot = await getDocs(q);
      (await snapShot).forEach((data) => {
        console.log(data.data());
        getCommentsForPost(data.id);
      });
    } catch (error) {
      console.log("error fetching your documents");
    }
  };

  useLayoutEffect(() => {
    setIsLoading(true);
    getLocation();
  }, []);

  useEffect(() => {
    getLocation();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        getData();
        getDocumentsByQuery();
        console.log(user.displayName);
      } else {
        setUser(null);
        console.log("You need to log in first");
      }
    });
  }, []);

  const getLocation = async () => {
    try {
      const location = await axios.get("https://ipapi.co/json");
      setCurrLocation(location.data);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  const deletePostHandler = async (postId,userEmail) => {
    if(userEmail===postId.userMail){console.log("you can delete this")}
    else{
      console.log("you can't delete this")
    }
    console.log(user.email);
    console.log(postId.userMail);
    console.log(postId);
    // await deleteDoc(doc(db, "posts",postId));
  };

  const handleComment = async (commentText, postId) => {
    if (!postId) {
      console.error("No post id provided for commenting");
      return;
    }

    const commentRef = collection(firestoreDb, "comments");
    await addDoc(commentRef, {
      postId: postId,
      comment: commentText,
      userMail: user.email,
      userName: user.displayName,
    });
    getCommentsForPost(postId); // Refresh comments for the current post
  };

  if (isLoading) {
    return <div>Grabbing Your Location...</div>;
  }
  if (error) {
    return <div>Kuch toh gadbad hai location access krne me teri</div>;
  }

  if (user) {
    return (
      <>
        <br />
        <h1>Need Help {user.displayName} ? Upload a Post 👇</h1>
        <br />
        <input type="file" onChange={(e) => uploadImage(e)} />
        <input
          onChange={(e) => setTxt(e.target.value)}
          placeholder="Enter Details"
        />
        <button onClick={handleClick}>Create Post</button> <br /> <br /> <br />
        <h1>Wanna Volunteer ? Recent Need Posts Near {currLocation.city} - </h1>
        {data.map((value) => (
          <div key={value.id}>
            <img src={value.proof} height="400px" width="400px" alt="" /> <br />
            <button onClick={() => deletePostHandler(value.id,user.email)}>
              Delete Post
            </button>
            <h3>Details - {value.caption}</h3>
            <h3>Post By - {value.userMail}</h3>
            <h4>Comments:</h4>
            {comments[value.id] &&
              comments[value.id].map((comment, index) => (
                <div key={index}>
                  <p>
                    {comment.userName}: {comment.comment}
                  </p>
                </div>
              ))}
            <input
              type="text"
              placeholder="Want To Help ?"
              onChange={(e) => {
                const { value } = e.target;
                setCurrentPostId(value.id); // Set currentPostId here before calling handleComment
                setTxt(value); // Update txt state with the comment text
              }}
            />
            <button onClick={() => handleComment(txt, value.id)}>Submit</button>{" "}
            {/* Add a submit button */}
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
