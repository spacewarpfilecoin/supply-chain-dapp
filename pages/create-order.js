import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Contract, providers } from "ethers";
import { useContract, useProvider, useSigner, useAccount } from "wagmi";

import {
  SMART_CONTRACT_ABI,
  SMART_CONTRACT_ADDRESS,
  RAW_CONTRACT_ADDRESS,
  RAW_CONTRACT_ABI,
} from "constants";
import Loader from "@layouts/components/Loader";
import { useRouter } from "next/router";

const CreateOrder = () => {
  // State variables to store the values of the input fields
  const [receiver, setReceiver] = useState("");
  const { address, isConnecting, isDisconnected } = useAccount();
  const [sender, setSender] = useState(address);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [shippingAddresss, setShippingAddress] = useState("");
  const route = useRouter();
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
  // Function to handle the form submit event
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);

      const rawScoord = await getRawDataContract.stringToBytes32(
        "52.37403, 4.88969"
      );
      const rawDcoord = await getRawDataContract.stringToBytes32(
        "62.37403, 5.88969"
      );

      const didItWork = await getTrackerContract.createOrder(
        receiver,
        sender,
        rawDcoord,
        rawScoord
      );
      setLoading(false);
      route.push("/orders-overview");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

    // the code to process the order data goes here

    // Reset the input fields to empty strings
    // setReceiver("");
    // setSender("");
    // setDeliveryAddress("");
    // setShippingAddress("");
  };

  return (
    <div className="bg-theme-light">
      <div id="createOrder" className=" mx-auto h-screen max-w-sm py-20 px-6 ">
        <div className="text-center">
          <Link href="createOrder" className="mt-20 text-xl font-medium">
            Create Order
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="mb-4">
            <label className="mb-2 block font-medium text-gray-700">
              Reciever
            </label>
            <input
              type="text"
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
              className="w-full rounded-full border border-gray-400 p-2 text-black"
              placeholder="Enter your receiver"
              required
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block rounded-full font-medium text-gray-700 ">
              Sender
            </label>
            <input
              type="sender"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              className="w-full rounded-full border border-gray-400 p-2 text-black "
              placeholder="Enter your sender"
              required
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block rounded-full font-medium  text-gray-700">
              Delivery Address
            </label>
            <input
              type="text"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="w-full rounded-full border border-gray-400 p-2 text-black"
              placeholder="Enter your shipping delivery address"
              required
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block font-medium text-gray-700">
              Shipping Address
            </label>
            <input
              type="text"
              value={shippingAddresss}
              onChange={(e) => setShippingAddress(e.target.value)}
              className="text-md w-full rounded-full border border-gray-400 p-2 text-black"
              placeholder="Enter the shipping address you want to order"
              required
            />
          </div>
          <button
            type="submit"
            className="flex w-full items-center justify-center rounded-full border bg-blue-900 p-4 text-white"
          >
            {loading ? <Loader /> : "Create Order"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateOrder;
