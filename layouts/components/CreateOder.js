import React, { useState } from "react";

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
    <div className="p-10 max-w-sm mx-auto">
      <h2 className="text-2xl font-medium mb-6">Create Order</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">
            Reciever
          </label>
          <input
            type="text"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            className="border border-gray-400 p-2 w-full"
            placeholder="Enter your receiver"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">
            Sender
          </label>
          <input
            type="sender"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            className="border border-gray-400 p-2 w-full"
            placeholder="Enter your sender"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">
            Delivery Address
                  </label>
                   <input
            type="text"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            className="border border-gray-400 p-2 w-full"
            placeholder="Enter your shipping delivery address"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">
            Shipping Address
          </label>
          <input
            type="text"
            value={shippingAddresss}
            onChange={(e) => setShippingAddress(e.target.value)}
            className="border border-gray-400 p-2 w-full"
            placeholder="Enter the shipping address you want to order"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-500 text-white p-2 w-full"
        >
          Create Order
        </button>
      </form>
    </div>
  );
};

export default CreateOrder;