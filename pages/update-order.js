import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Contract, providers } from "ethers";
import { useContract, useProvider, useSigner } from "wagmi";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";

import {
  SMART_CONTRACT_ABI,
  SMART_CONTRACT_ADDRESS,
  RAW_CONTRACT_ADDRESS,
  RAW_CONTRACT_ABI,
} from "constants";
import Loader from "@layouts/components/Loader";

const UpdateTracker = () => {
  const router = useRouter();
  const {
    query: { itemId, orderStatus },
  } = router;
  const [id, setId] = useState(itemId ? itemId : "");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("");
  const provider = useProvider();
  const { data: signer, isError, isLoading } = useSigner();

  const [loading, setLoading] = React.useState(false);

  const getRawDataContract = useContract({
    address: RAW_CONTRACT_ADDRESS,
    abi: RAW_CONTRACT_ABI,
    signerOrProvider: provider,
  });

  const getTrackerContract = useContract({
    address: SMART_CONTRACT_ADDRESS,
    abi: SMART_CONTRACT_ABI,
    signerOrProvider: signer,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add code to submit form data to server here
    try {
      setLoading(true);

      const rawScoord = await getRawDataContract.stringToBytes32(
        address.trim()
      );

      const didItWork = await getTrackerContract.updateTracker(
        id,
        rawScoord,
        status
      );
      await didItWork.wait();
      setLoading(false);
      router.push("/orders-overview");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setId("");
    setAddress("");
    setStatus("");
  };
  const handleUpdateLocation = async (value) => {
    const results = await geocodeByAddress(value.label);
    const latLng = await getLatLng(results[0]);
    setAddress(latLng.lat + "," + latLng.lng);
  };
  return (
    <div className="bg-theme-light">
      <div id="createOrder" className=" mx-auto h-screen max-w-sm py-20 px-6 ">
        <div className="text-center">
          <Link href="updateOrder" className="mt-10 text-2xl font-medium">
            Update Order
          </Link>
        </div>
        <div className="mx-auto max-w-sm p-10">
          <h2 className="mb-6 text-center text-xl font-medium">
            Update Current Order Location
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="mb-2 block font-medium text-gray-700">ID</label>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="ext-black w-full rounded-full border border-gray-400 p-2"
                placeholder="Enter your tracking id"
                required
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block font-medium text-gray-700">
                Address
              </label>
              <GooglePlacesAutocomplete
                apiKey={"AIzaSyA0Fui7mx4b1rtwZ-TQuY1r80bkOCfj6zY"}
                selectProps={{
                  address,
                  onChange: (place) => handleUpdateLocation(place),
                }}
                className={
                  "w-full rounded-full border border-gray-400 p-2 text-black"
                }
                placeholder="Enter your shipping delivery address"
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block font-medium text-gray-700">
                Status
              </label>
              <select
                id="status"
                name="status"
                className="focus:shadow-outline ext-black w-full appearance-none rounded rounded-full border py-2 px-3 leading-tight shadow focus:outline-none"
                value={status ? status : orderStatus}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="1">IN_TRANSIT</option>
                <option value="2">WAREHOUSE</option>
                <option value="3">TRIED TO DELIVER</option>
                {/* <option value="4">DELIVERY CONFIRMED</option> */}
              </select>
              {/* <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-400 p-2 w-full"
            placeholder="Enter the order status"
            required
          /> */}
            </div>
            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-full border bg-blue-900 p-4 text-white"
            >
              {loading ? <Loader /> : "Update"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateTracker;
