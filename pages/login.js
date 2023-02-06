import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { Web3Button, Web3NetworkSwitch } from "@web3modal/react";

const Login = () => {
  //   function redirect() {
  //     router.push('/home')
  //  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // connectWallet();
  };

  return (
    <div className="flex h-screen items-center justify-center bg-theme-light text-center">
      <form
        className="mt-8  rounded-lg bg-white px-12 py-6 shadow-md "
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center gap-4">
          <img
            src="images/favicon.png"
            alt="spplychain-favicon"
            className="h-[30px] w-[30px]"
          />
          <h2 className="font-semi-bold mb-4 text-3xl ">Splychain</h2>
        </div>
        <div className="mb-1 mt-4">
          <label
            className="block font-medium text-gray-700 "
            htmlFor="password"
          >
            Please Connect you external Wallet to continue
          </label>
        </div>
        <Web3Button
          className="p-20"
          icon="show"
          label="Connect Wallet"
          balance="hide"
        />
        <br />

        {/* Network Switcher Button */}
        <Web3NetworkSwitch />
        <br />
      </form>
    </div>
  );
};

export default Login;
