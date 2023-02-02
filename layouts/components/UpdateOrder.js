import React, { useState } from 'react'

const UpdateTracker = () => {
    const [id, setId] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("");

//     function coordinates(address) {
// const API_KEY = 'your_api_key';

// fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`)
//   .then(response => response.json())
//   .then(data => {
//     const { lat, lng } = data.results[0].geometry.location;
//     console.log(`Latitude: ${lat}, Longitude: ${lng}`);
//   });

//     }
//     // this returns the coordinatess of the current 
//     // location of the package
//    const currentLocation = coordinates(address)
    

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add code to submit form data to server here
     setId("");
    setAddress("");
    setStatus("");
  };

    return (
    <div className="p-10 max-w-sm mx-auto">
      <h2 className="text-2xl font-medium mb-6">Update Current Order Location</h2>
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
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border border-gray-400 p-2 w-full"
            placeholder="Enter your address"
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">
            Status
                    </label>
                    <select
          id="status"
          name="status"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="ORDER_PLACED">ORDER_PLACED</option>
          <option value="IN_TRANSIT">IN_TRANSIT</option>
          <option value="DELIVERED">DELIVERED</option>
          <option value="COLLECTED">COLLECTED</option>
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
          className="bg-indigo-500 text-white p-2 w-full"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateTracker;
