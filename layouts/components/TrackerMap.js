import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { useContract, useProvider, useSigner, useAccount } from "wagmi";
import Loader from "./Loader";
import {
  SMART_CONTRACT_ABI,
  SMART_CONTRACT_ADDRESS,
  RAW_CONTRACT_ADDRESS,
  RAW_CONTRACT_ABI,
} from "constants";

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

const ProductMap = ({ itemId }) => {
  const { data: signer, isError, isLoading } = useSigner();
  const [loading, setLoading] = useState(false);
  const [newCoordinates, setNewCoordinates] = useState([]);
  const provider = useProvider();

  const getTrackerContract = useContract({
    address: SMART_CONTRACT_ADDRESS,
    abi: SMART_CONTRACT_ABI,
    signerOrProvider: signer,
  });
  const getRawDataContract = useContract({
    address: RAW_CONTRACT_ADDRESS,
    abi: RAW_CONTRACT_ABI,
    signerOrProvider: provider,
  });
  const getCoordinates = async () => {
    try {
      setLoading(true);
      const coordinatesArray = await getTrackerContract.getTrackerHistory(
        itemId
      );
      const refactoredCoordinates =
        await getRawDataContract.arrayBytes32ToString(coordinatesArray[0]);
      setNewCoordinates(refactoredCoordinates);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const [path, setPath] = useState([]);
  const parsedCoordinates = parseCoordinates(newCoordinates);

  useEffect(() => {
    getCoordinates();
  }, []);

  const handleApiLoaded = (map, maps) => {
    const bounds = new maps.LatLngBounds();
    console.log({ parsedCoordinates });
    parsedCoordinates.forEach((coordinate) => {
      bounds.extend({
        lat: coordinate.latitude,
        lng: coordinate.longitude,
      });
    });
    map.fitBounds(bounds);

    var polyline = new maps.Polyline({
      path: path,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
    });
    polyline.setMap(map);
  };

  useEffect(() => {
    setPath(
      parsedCoordinates.map((coordinate) => ({
        lat: coordinate.latitude,
        lng: coordinate.longitude,
      }))
    );
  }, [path]);

  return (
    <div
      style={{
        height: "700px",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      {loading ? (
        <Loader />
      ) : (
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyA0Fui7mx4b1rtwZ-TQuY1r80bkOCfj6zY" }}
          defaultCenter={{ lat: 37.7749, lng: -122.4194 }}
          defaultZoom={12}
          yesIWantToUseGoogleMapApiInternals
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
      )}
    </div>
  );
};

export default ProductMap;
