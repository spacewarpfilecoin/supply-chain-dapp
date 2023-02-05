import React, { useState } from "react";
import Link from "next/link";

const ConfirmOrder = () => {
  const [id, setId] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add code to submit form data to server here
    setId("");
  };

  return (
    <div className="bg-theme-light ">
      <div className="mx-auto flex h-screen max-w-sm flex-col items-center justify-center px-6 py-10 ">
        <Link href="createOrder" className="mb-10 text-2xl font-medium">
          Confirmed Order
        </Link>
        <h2 className="mb-6 text-center text-xl font-medium">
          Sign with your wallet to confirm
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6 ">
            <label className="mb-2 block font-medium text-gray-700">ID</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full rounded-full border border-gray-400 p-2"
              placeholder="Enter your tracking id"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full border bg-blue-900 p-2 text-white shadow-md"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmOrder;
