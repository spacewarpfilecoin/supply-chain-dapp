import React, { useState } from "react";
import ReactModal from "react-modal";

function List({ items, handleUpdate }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleClose = () => {
    setSelectedItem(null);
    setShowModal(false);
  };

  return (
    <div className="mx-auto flex h-screen items-center justify-center bg-theme-light">
      {items?.length > 0 ? (
        <div id="createOrder" className=" max-w-sm py-20 px-6 ">
          <ul>
            {items.map((item) => (
              <li
                key={item.id}
                className="w-80% m-10 flex justify-between rounded border border-gray-300 p-10"
              >
                <div onClick={() => handleClick(item)}>{item.name}</div>
                <button onClick={handleUpdate}>Update</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <button
          type="submit"
          className="w-1/4 rounded-full bg-blue-900 p-2 text-white"
        >
          Create order!
        </button>
      )}

      <ReactModal isOpen={showModal} onRequestClose={handleClose}>
        {selectedItem && (
          <div>
            <div>{selectedItem.name}</div>
            <button onClick={handleClose}>Close</button>
            <TrackerMap props={item} />
          </div>
        )}
      </ReactModal>
    </div>
  );
}

export default List;
