import React, { useState } from 'react'
import Link from 'next/link';

const ConfirmOrder = () => {
    const [id, setId] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault();
    // Add code to submit form data to server here
     setId("");
    
  };

    return (
      <div className="bg-theme-light ">
    <div className="flex flex-col justify-center items-center h-screen px-6 py-10 max-w-sm mx-auto ">
    <Link  href="createOrder" className="text-2xl font-medium mb-10">Confirmed Order</Link>
      <h2 className="text-xl font-medium mb-6 text-center">Sign with your wallet to confirm</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6 ">
          <label className="block mb-2 font-medium text-gray-700">
            ID
          </label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="border border-gray-400 p-2 w-full rounded-full"
            placeholder="Enter your tracking id"
            required
          />
        </div>
     
        <button
          type="submit"
          className="bg-blue-900 text-white p-2 w-full border rounded-full shadow-md"
        >
          Confirm
        </button>
      </form>
    </div>
    </div>
  );
};

export default ConfirmOrder;

