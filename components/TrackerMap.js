import React, { useEffect, useState } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const Map = withScriptjs(
  withGoogleMap((props) => {
    const [coordinates, setCoordinates] = useState([]);

    useEffect(() => {
      setCoordinates(props.coordinates);
    }, [props.coordinates]);

    return (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: 37.7749, lng: -122.4194 }}
      >
        {coordinates.map((coordinate) => (
          <Marker
            key={coordinate.id}
            position={{ lat: coordinate.latitude, lng: coordinate.longitude }}
          />
        ))}
      </GoogleMap>
    );
  })
);

function ProductMap(props) {
  return (
    <Map
      googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA0Fui7mx4b1rtwZ-TQuY1r80bkOCfj6zY`}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      coordinates={props.coordinates}
    />
  );
}

export default ProductMap;
