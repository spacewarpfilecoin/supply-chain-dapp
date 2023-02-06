import React, { useState } from "react";
import ReactModal from "react-modal";
import { useContract, useProvider, useSigner, useAccount } from "wagmi";

import { SMART_CONTRACT_ABI, SMART_CONTRACT_ADDRESS } from "constants";
import ProductMap from "@layouts/components/TrackerMap";
import Loader from "@layouts/components/Loader";
import { set } from "date-fns";
import { useRouter } from "next/router";
import Navbar from "@layouts/components/Navbar";
import Login from "pages/login";

const orderStatus = { 1: "IN_TRANSIT", 2: "WAREHOUSE", 3: "TRIED TO DELIVER" };

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
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
          <div class="mx-auto flex h-screen max-w-2xl  flex-col items-center justify-center">
            <div class=" mt-50 flex h-3/4 w-full flex-col items-center justify-center rounded-lg border bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800 sm:p-8">
              <div class="mt-50 mb-4 flex items-center justify-center ">
                <h3 class="text-xl font-bold leading-none text-gray-900 dark:text-white">
                  All Orders
                </h3>
              </div>
              <div class="flow-root">
                {orders[1]?.length > 0 ? (
                  <div
                    id="createOrder"
                    class="w-100% py-50 relative flex h-screen items-center justify-center px-6 "
                  >
                    <ul
                      role="list"
                      class="justify-stretch divide-y divide-gray-200 dark:divide-gray-700"
                    >
                      {orders[1].map((item, index) => (
                        <>
                          <li class="pt-3 pb-0 sm:pt-4">
                            <div class="flex items-center space-x-4">
                              <div class="flex-shrink-0"></div>
                              <div class="min-w-0 flex-1">
                                <p class="truncate text-sm font-medium text-gray-900 dark:text-white">
                                  Order: {index}
                                </p>
                                <p class="truncate text-sm font-medium text-gray-900 dark:text-white">
                                  Status: {orderStatus[item]}
                                </p>
                              </div>
                              <button
                                class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"
                                onClick={() => handleClick(index)}
                              >
                                View Map
                              </button>
                              <button
                                onClick={() => handleUpdate(index, item)}
                                class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"
                              >
                                Update
                              </button>
                            </div>
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
            </div>
          </div>
        </>
      ) : (
        <Login />
      )}
    </>
  );
}

export default Home;
