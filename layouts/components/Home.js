import React, { useState, useEffect } from 'react'

const INPUT_API_KEY = process.env.INPUT_API_KEY;

const Home = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    error: null
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        });
      },
      (error) => {
        setLocation({
          latitude: null,
          longitude: null,
          error: error.message
        });
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  return (
    <div>
      <p>Latitude: {location.latitude}</p>
      <p>Longitude: {location.longitude}</p>
      {location.error && <p>Error: {location.error}</p>}
      {location.latitude && location.longitude && (
        <iframe
          width="600"
          height="450"
          frameBorder="0"
          style={{ border: 0 }}
          src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyA0Fui7mx4b1rtwZ-TQuY1r80bkOCfj6zY&center=${location.latitude},${location.longitude}&zoom=17`}
          allowFullScreen
        />
      )}
    </div>
  );
};

export default Home