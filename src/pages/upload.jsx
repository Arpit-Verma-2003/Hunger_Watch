import React, { useState} from "react";
import { storage } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
const Upload = () => {
  const [img, setImg] = useState(null);
  const uploadImage = () => {
    if (img == null) return;
    const imgref = ref(storage, `proof/${img.name + v4()}`);
    uploadBytes(imgref, img).then(() => {
      alert("image uploaded");
    });
  };
  return (
    <>
    <br />
    <h1>Upload Proof Of Need</h1>
    <br />
      <input
        type="file"
        onChange={(event) => {
          setImg(event.target.files[0]);
        }}
      />
      <button onClick={uploadImage}>Upload Proof</button>
    </>
  );
};

export default Upload;
