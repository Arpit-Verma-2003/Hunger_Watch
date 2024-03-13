import React, { useState, useEffect } from "react";
import axios from "axios";
const Location = () => {
  const [currLocation, setCurrLocation] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  useEffect(() => {
    setIsLoading(true);
    getLocation();
  }, []);
  const getLocation = async () => {
    try {
        const location = await axios.get("https://ipapi.co/json");
        setCurrLocation(location.data);
    } catch (e) {
        setError(e);
    }
    finally{
        setIsLoading(false);
    }
    
  };
  if(isLoading){
    return <div> Rukja Ek Sec...</div>
  }
  if(error){
    return<div> Kuch toh gadbad hai location access krne me teri</div>
  }
  return (
    <div>
      <h1>Your location details - </h1>
      <h3>Your city - {currLocation.city}</h3>
      <h3>Your state - {currLocation.region}</h3>
      <h3>Your country - {currLocation.country_name}</h3>
      <h3>Your connection - {currLocation.org}</h3>
      <br/><br /><br />
    </div>
  );
};

export default Location;
