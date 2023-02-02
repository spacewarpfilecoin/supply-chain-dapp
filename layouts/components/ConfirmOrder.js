import React, { useState } from 'react'

const ConfirmOrder = () => {
    const [id, setId] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault();
    // Add code to submit form data to server here
     setId("");
    
  };

    return (
    <div className="p-10 max-w-sm mx-auto">
      <h2 className="text-2xl font-medium mb-6">Sign with your wallet to confirm</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">
            ID
          </label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="border border-gray-400 p-2 w-full"
            placeholder="Enter your tracking id"
            required
          />
        </div>
     
        <button
          type="submit"
          className="bg-indigo-500 text-white p-2 w-full"
        >
          Confirm
        </button>
      </form>
    </div>
  );
};

export default ConfirmOrder;

