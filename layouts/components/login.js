import Link from "next/link";
import React, { useState, useEffect} from "react";
import { useRouter } from 'next/router'
import Image from "next/image";
import { sequence } from '0xsequence';
import { ethers } from 'ethers';
import Web3Modal from '@0xsequence/web3modal'
import WalletConnect from '@walletconnect/web3-provider'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let router= useRouter();

//   function redirect() {
//     router.push('/home')
//  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email === "hello@example.com") {
      setError("");
      // Navigate to the home page after successful login
      // router.push('/home')
      // router.push('/order')
      router.push('/update')
    } else {
      setError("Invalid email or password");
    }
  };
  
 
  return (
    <div className="flex justify-center items-center text-center h-screen bg-theme-light">
      <form className="bg-white  rounded-lg shadow-md px-12 py-6 " onSubmit={handleSubmit}>
      <div className="flex gap-4 justify-center">
      <img src="images/favicon.png" alt="spplychain-favicon" className='w-[30px] h-[30px]' />
      <h2 className="text-3xl font-semi-bold mb-4 "
      >
        Splychain
        </h2>
      </div>
      <div className="">
        <h2 className="text-lg text-center">
          Sign in
        </h2>
        <p>Continue with</p>
        <div className="py-4">
          <ul className="flex justify-center gap-2">
            <li className="cursor-pointer">
            <Link href='' />
            <img src="images/twitter.svg" alt="twitter-icon" />
            </li>
            <li className="cursor-pointer">
            <Link href='' />
            <img src="images/google.svg" alt="google-icon"/>
            </li>
          </ul>
        </div>
      </div>
      <div className="mb-4 ">
        <label
          className="block text-gray-700 font-medium mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="hello@example.com"
          value={email}
          onChange={(e) => setEmail
        (e.target.value)}
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-full w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
        />
      </div>
       {error && (
        <div className="mb-3 text-red-500 text-sm">{error}</div>
        
      )}
      <button
        type="submit"
        className="bg-blue-900 text-white appearance-none border-2 rounded-full cursor-pointer w-full py-2 px-4 leading-tight focus:outline-none"
      >
        Continue with Email
      </button>
      {/* <div className="mb-4">
        </div> */}
      <div className="mb-1 mt-4">
        <label
          className="block text-gray-700 font-medium "
          htmlFor="password"
        >
          External Wallet
        </label>
      </div>
      <button className="bg-blue-900 text-white appearance-none border-2 rounded-full cursor-pointer w-full py-2 px-4 leading-tight focus:outline-none"
        >
          Connect Wallet
          </button>
    </form> 
    </div>
  );
};

export default Login;
