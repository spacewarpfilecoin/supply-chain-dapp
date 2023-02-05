export const SMART_CONTRACT_ADDRESS =
  "0xD36eFA1b70e74387C8c284775C46F946893936d1";
export const SMART_CONTRACT_ABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "ApprovalForDelivery",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "deliveryCoordinates",
        type: "bytes32",
      },
      { indexed: true, internalType: "uint256", name: "id", type: "uint256" },
    ],
    name: "OrderCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "id", type: "uint256" },
      {
        indexed: true,
        internalType: "bytes32",
        name: "coordinates",
        type: "bytes32",
      },
      { indexed: false, internalType: "uint8", name: "status", type: "uint8" },
    ],
    name: "TrackerUpdated",
    type: "event",
  },
  {
    inputs: [{ internalType: "uint256", name: "_id", type: "uint256" }],
    name: "confirmDelivery",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_receiver", type: "address" },
      { internalType: "address", name: "_sender", type: "address" },
      {
        internalType: "bytes32",
        name: "_deliveryCoordinates",
        type: "bytes32",
      },
      { internalType: "bytes32", name: "shipmentCoordinates", type: "bytes32" },
    ],
    name: "createOrder",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllShipments",
    outputs: [
      { internalType: "uint256[]", name: "", type: "uint256[]" },
      { internalType: "uint8[]", name: "", type: "uint8[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_id", type: "uint256" }],
    name: "getTrackerHistory",
    outputs: [
      { internalType: "bytes32[]", name: "", type: "bytes32[]" },
      { internalType: "uint256[]", name: "", type: "uint256[]" },
      { internalType: "uint8[]", name: "", type: "uint8[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "addr", type: "address" },
      { internalType: "bool", name: "val", type: "bool" },
    ],
    name: "setAuthorized",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setDeliveryApproval",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bool", name: "val", type: "bool" }],
    name: "setPaused",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_id", type: "uint256" },
      { internalType: "bytes32", name: "coordinates", type: "bytes32" },
      { internalType: "uint8", name: "status", type: "uint8" },
    ],
    name: "updateTracker",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
export const RAW_CONTRACT_ADDRESS =
  "0x74d7e9e9d6cBa2B50A9b8a7F58C555e0d31726F7";
export const RAW_CONTRACT_ABI = [
  {
    inputs: [
      { internalType: "bytes32[]", name: "_bytes32", type: "bytes32[]" },
    ],
    name: "arrayBytes32ToString",
    outputs: [{ internalType: "string[]", name: "", type: "string[]" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "_bytes32", type: "bytes32" }],
    name: "bytes32ToString",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "source", type: "string" }],
    name: "stringToBytes32",
    outputs: [{ internalType: "bytes32", name: "result", type: "bytes32" }],
    stateMutability: "pure",
    type: "function",
  },
];
