import Link from "next/link";
import React, { useState, useEffect, useRef} from "react";
import { useRouter } from 'next/router'
import { Contract, providers, utils } from "ethers";
import Web3Modal from "web3modal";



const Login = () => {
  {/** */}
  const [walletConnected, setWalletConnected] = useState(false);
  const [error, setError] = useState("");
  let router= useRouter();
  const web3ModalRef = useRef();

//   function redirect() {
//     router.push('/home')
//  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "HyperSpace",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
    }

  // connectWallet();
  setWalletConnected(true)
  };

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
      router.push('/home')
    } catch (err) {
      console.error(err);
    }
  }; 


  const getProviderOrSigner = async (needSigner = false) => {
    // Connect to Metamask
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    // If user is not connected to the HyperSpace network, let them know and throw an error
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 3141) {
      window.alert("Unsopprted network");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };
 
  useEffect(() => {
    
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "HyperSpace",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
    }
  }, [walletConnected]);
  return (
    <div className="flex justify-center items-center text-center h-screen bg-theme-light">
      <form className="bg-white  rounded-lg shadow-md px-12 py-6 mt-8 " onSubmit={handleSubmit}>
      <div className="flex gap-4 justify-center">
      <img src="images/favicon.png" alt="spplychain-favicon" className='w-[30px] h-[30px]' />
      <h2 className="text-3xl font-semi-bold mb-4 "
      >
        Splychain
        </h2>
      </div>
       <div className="mb-1 mt-4">
        <label
          className="block text-gray-700 font-medium "
          htmlFor="password"
        >
          Please Connect you external Wallet to continue
        </label>
      </div>
      {/* <button onClick={connectWallet} className="bg-blue-900 text-white appearance-none border-2 rounded-full cursor-pointer w-full py-2 px-4 leading-tight focus:outline-none"
        >
          Connect Wallet
          </button> */}
    </form> 
    </div>
  );
};

export default Login;
