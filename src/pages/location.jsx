import React, { useState, useEffect } from "react";
import axios from "axios";

const Location = () => {
  const [currLocation, setCurrLocation] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
      const location = await axios.get("https://ipapi.co/json");
      setCurrLocation(location.data);
    } catch (e) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f9fafb",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <h1>Your location details - </h1>
      <h2>(Posts Would be Displayed According To Your Location)</h2>
      <h3>Your city - {currLocation.city}</h3>
      <h3>Your state - {currLocation.region}</h3>
      <h3>Your country - {currLocation.country_name}</h3>
      <h3>Your connection - {currLocation.org}</h3>
      {isLoading && <div>Rukja Ek Sec...</div>}
      {error && <div>Kuch toh gadbad hai location access krne me teri</div>}
    </div>
  );
};

export default Location;
