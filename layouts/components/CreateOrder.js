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
    <div id="createOrder" className=" mx-auto py-20 px-6 max-w-sm h-screen ">
      <div className="text-center">
    <Link  href="createOrder" className="text-xl font-medium mt-20">Create Order</Link>
    </div>
      <form onSubmit={handleSubmit} className="mt-8">
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">
            Reciever
          </label>
          <input
            type="text"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            className="border border-gray-400 rounded-full text-gray-100 p-2 w-full"
            placeholder="Enter your receiver"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium rounded-full text-gray-700 ">
            Sender
          </label>
          <input
            type="sender"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            className="border border-gray-400 text-gray-100 rounded-full p-2 w-full"
            placeholder="Enter your sender"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium rounded-full text-gray-700">
            Delivery Address
                  </label>
                   <input
            type="text"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            className="border border-gray-400 rounded-full p-2 w-full"
            placeholder="Enter your shipping delivery address"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">
            Shipping Address
          </label>
          <input
            type="text"
            value={shippingAddresss}
            onChange={(e) => setShippingAddress(e.target.value)}
            className="border border-gray-400 rounded-full text-md text-slate-100 p-2 w-full"
            placeholder="Enter the shipping address you want to order"
            required
          />
        </div>
        <button
          type="submit"
          className="border rounded-full bg-blue-900 text-white p-2 w-full"
        >
          Create Order
        </button>
      </form>
    </div>
    </div>
  );
};

export default CreateOrder;