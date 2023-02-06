import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";

const Marker = ({ id }) => (
  <div
    style={{
      backgroundColor: "red",
      width: "10px",
      height: "10px",
      borderRadius: "5px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      fontWeight: "bold",
    }}
  >
    {console.log({ id })}
    {id}
  </div>
);

const parseCoordinates = (coordinates) =>
  coordinates.map((coordinate, index) => {
    const [latitude, longitude] = coordinate.split(",");
    return {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      index,
    };
  });

const ProductMap = ({ coordinates }) => {
  const [path, setPath] = useState([]);
  const parsedCoordinates = parseCoordinates(coordinates);
  useEffect(() => {
    setPath(
      parsedCoordinates.map((coordinate) => ({
        lat: coordinate.latitude,
        lng: coordinate.longitude,
      }))
    );
  }, [coordinates]);

  const handleApiLoaded = (map, maps) => {
    const bounds = new maps.LatLngBounds();
    parsedCoordinates.forEach((coordinate) => {
      bounds.extend({
        lat: coordinate.latitude,
        lng: coordinate.longitude,
      });
    });
    map.fitBounds(bounds);

    const triangleCoords = path;
    var polyline = new maps.Polyline({
      path: triangleCoords,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
    });
    polyline.setMap(map);
  };

  return (
    <div style={{ height: "700px", width: "80%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyA0Fui7mx4b1rtwZ-TQuY1r80bkOCfj6zY" }}
        defaultCenter={{ lat: 37.7749, lng: -122.4194 }}
        defaultZoom={8}
        zoom={20}
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        {parsedCoordinates.map((coordinate) => (
          <Marker
            key={coordinate.index}
            lat={coordinate.latitude}
            lng={coordinate.longitude}
            id={coordinate.index + 1}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default ProductMap;
