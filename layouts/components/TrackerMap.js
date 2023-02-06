import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";

const Marker = ({ id }) => (
  <div
    style={{
      backgroundColor: "red",
      width: "10px",
      height: "10px",
      borderRadius: "5px",
    }}
  />
);

const parseCoordinates = (coordinates) =>
  coordinates.map((coordinate) => {
    const [latitude, longitude] = coordinate.split(",");
    console.log({ latitude, longitude });
    return { latitude: parseFloat(latitude), longitude: parseFloat(longitude) };
  });

const ProductMap = ({ coordinates }) => {
  const [path, setPath] = useState([]);
  const parsedCoordinates = parseCoordinates(coordinates);
  console.log(parsedCoordinates);
  useEffect(() => {
    setPath(
      parsedCoordinates.map((coordinate) => ({
        lat: coordinate.latitude,
        lng: coordinate.longitude,
      }))
    );
  }, [coordinates]);
  const handleApiLoaded = (map, maps) => {
    const triangleCoords = path;

    var bermudaTriangle = new maps.Polyline({
      paths: triangleCoords,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
    });
    bermudaTriangle.setMap(map);
  };
  return (
    <div style={{ height: "400px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyA0Fui7mx4b1rtwZ-TQuY1r80bkOCfj6zY" }}
        defaultCenter={{ lat: 37.7749, lng: -122.4194 }}
        defaultZoom={8}
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        {parsedCoordinates.map((coordinate, index) => (
          <Marker
            key={index}
            lat={coordinate.latitude}
            lng={coordinate.longitude}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default ProductMap;
