import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const CreateOrder = () => {
  // State variables to store the values of the input fields
  const [receiver, setReceiver] = useState("");
  const [sender, setSender] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [shippingAddresss, setShippingAddress] = useState("");

  // Function to handle the form submit event
  const handleSubmit = (event) => {
    event.preventDefault();

    // the code to process the order data goes here

    // Reset the input fields to empty strings
    setReceiver("");
    setSender("");
    setDeliveryAddress("");
    setShippingAddress("");
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
              className="w-full rounded-full border border-gray-400 p-2 text-gray-100"
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
              className="w-full rounded-full border border-gray-400 p-2 text-gray-100"
              placeholder="Enter your sender"
              required
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block rounded-full font-medium text-gray-700">
              Delivery Address
            </label>
            <input
              type="text"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="w-full rounded-full border border-gray-400 p-2"
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
              className="text-md w-full rounded-full border border-gray-400 p-2 text-slate-100"
              placeholder="Enter the shipping address you want to order"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full border bg-blue-900 p-2 text-white"
          >
            Create Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateOrder;
