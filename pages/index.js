import React, { useState } from "react";
import ReactModal from "react-modal";
import { useContract, useProvider, useSigner, useAccount } from "wagmi";

import { SMART_CONTRACT_ABI, SMART_CONTRACT_ADDRESS } from "constants";
import ProductMap from "@layouts/components/TrackerMap";
import Loader from "@layouts/components/Loader";
import { set } from "date-fns";
import { useRouter } from "next/router";
import Navbar from "@layouts/components/Navbar";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
  },
};

function Home() {
  const route = useRouter();
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [orders, setOrders] = React.useState([
    {
      id: 0,
      coordinates: ["23.3456,-67.1234", "45.6789,-12.3456", "-12.3456,67.8901"],
    },
    {
      id: 1,
      coordinates: ["34.6789,-12.5678", "67.2345,-56.7890", "-23.4567,56.7890"],
    },
    {
      id: 2,
      coordinates: ["-56.7890,89.1234", "12.3456,-34.5678", "67.8901,-23.1234"],
    },
    {
      id: 3,
      coordinates: ["12.3456,-34.5678", "67.8901,-23.1234", "34.1256,-67.8901"],
    },
    {
      id: 4,
      coordinates: ["67.8901,-23.1234", "34.1256,-67.8901", "-23.4567,56.7890"],
    },
    {
      id: 5,
      coordinates: ["34.1256,-67.8901", "-23.4567,56.7890", "67.2345,-89.1234"],
    },
    {
      id: 6,
      coordinates: ["-23.4567,56.7890", "67.2345,-89.1234", "12.6789,-56.7890"],
    },
    {
      id: 7,
      coordinates: ["67.2345,-89.1234", "12.6789,-56.7890", "-34.5678,23.1234"],
    },
    {
      id: 8,
      coordinates: ["12.6789,-56.7890", "-34.5678,23.1234", "23.3456,-67.1234"],
    },
    {
      id: 9,
      coordinates: ["-34.5678,23.1234", "23.3456,-67.1234", "45.6789,-12.3456"],
    },
  ]);
  const provider = useProvider();
  const { address, isConnected } = useAccount();

  const { data: signer, isError, isLoading } = useSigner();

  const [loading, setLoading] = React.useState(false);

  const handleClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleClose = () => {
    setSelectedItem(null);
    setShowModal(false);
  };
  const getTrackerContract = useContract({
    address: SMART_CONTRACT_ADDRESS,
    abi: SMART_CONTRACT_ABI,
    signerOrProvider: signer,
  });

  const handleGetShipments = async () => {
    try {
      setLoading(true);
      const orders = await getTrackerContract.getAllShipments();
      setOrders(orders);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleUpdate = (id, value) => {
    route.push({
      pathname: "/update-order",
      query: { itemId: id, orderStatus: value },
    });
  };

  React.useEffect(() => {
    handleGetShipments();
  }, [signer]);

  return (
    <>
      {isConnected ? (
        <>
          {!showModal ? (
            <header>
              <Navbar />
            </header>
          ) : null}
          <div class="pt-50 flex h-screen min-h-screen w-full items-center justify-center bg-theme-light">
            {orders[1]?.length > 0 ? (
              <div
                id="createOrder"
                class="w-100% relative flex h-screen items-center justify-center py-20 px-6 "
              >
                <ul class="pt-50 mx-h-screen flex w-full flex-col items-center justify-center">
                  {orders[1].map((item, index) => (
                    <>
                      <li
                        key={index + item}
                        className="h-10% m-10 flex w-3/4 justify-between rounded border border-gray-300 p-4"
                      >
                        <div onClick={() => handleClick(index)}>{index}</div>
                        <button onClick={() => handleUpdate(index, item)}>
                          Update
                        </button>
                      </li>
                    </>
                  ))}
                </ul>
              </div>
            ) : loading ? (
              <Loader />
            ) : (
              <button
                type="submit"
                className="w-1/4 rounded-full bg-blue-900 p-2 text-white"
              >
                Create order!
              </button>
            )}
            <ReactModal
              style={customStyles}
              key={selectedItem + "modal"}
              isOpen={showModal}
              onRequestClose={handleClose}
            >
              <>
                <button onClick={handleClose}>Close</button>
                <ProductMap itemId={selectedItem} />
              </>
            </ReactModal>
          </div>
        </>
      ) : (
        <Login />
      )}
    </>
  );
}

export default Home;
