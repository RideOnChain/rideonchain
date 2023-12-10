import Link from "next/link";
import Script from "next/script";
import React, { useContext, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Image from "next/image";
import avatar from "../temp/avatar.jpg";
import { BsPerson } from "react-icons/bs";
import { UberContext } from "../context/uberContext";

const style = {
  wrapper: `h-16 w-full bg-black text-white flex md:justify-around items-center px-60 fixed z-20`,
  leftMenu: `flex gap-3`,
  logo: `text-3xl text-white flex cursor-pointer mr-16`,
  menuItem: `hidden md:block text-lg text-white font-medium flex items-center mx-4 cursor-pointer`,
  rightMenu: `flex gap-3 items-center`,
  userImageContainer: `hidden md:block mr-2`,
  userImage: `h-10 w-10 mr-4 rounded-full p-px object-cover cursor-pointer`,
  loginButton: `flex items-center cursor-pointer rounded-full hover:bg-[#333333] px-4 py-1`,
  loginText: `ml-2`,
};
const Navbar = () => {
  const { currentAccount, connectWallet, currentUser } =
    useContext(UberContext);
  const [selectedChain, setSelectedChain] = useState("Ethereum"); // Initial chain
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // const handleChainChange = (chain) => {
  //   console.log(`Selected Chain: ${chain}`);
  //   setSelectedChain(chain);
  //   setIsDropdownOpen(false);
  // };

  const handleChainChange = async (chain) => {
    setSelectedChain(chain);

    const chainIdMapping = {
      Ethereum: "0x1", // Mainnet
      Arbitrum: "0xa4b1", // Arbitrum One
      ArbitrumTest: "0x66eee", // sepolia
      Polygon: "0x89",
      PolygonTest: "0x13881",
      Mantle: "0x1388",
      MantleTest: "0x1389",
      Scroll: "0x82750",
      ScrollTest: "0x8274f", // sepolia
    };

    const selectedChainId = chainIdMapping[chain];

    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: selectedChainId }],
        });
      } catch (error) {
        console.error("Error switching chain:", error);
        // Handle error (display a message to the user, etc.)
      }
    }

    setIsDropdownOpen(false);
  };
  const chainOptions = [
    "Ethereum",
    "Arbitrum",
    "ArbitrumTest",
    "Polygon",
    "PolygonTest",
    "Mantle",
    "MantleTest",
    "Scroll",
    "ScrollTest",
    "Celo",
  ];

  return (
    <nav className="flex flex-row justify-between md:justify-around items-center bg-black text-white h-16 fixed z-50 w-full">
      <section className="text-lg md:text-3xl cursor-pointer font-bold p-5">
        <Link href={"/"}>RideOnChain</Link>
      </section>
      <section
        className="bg-black hidden md:flex md:items-center absolute right-0 top-16 md:static w-1/2 md:w-fit"
        id="collapseLink"
      >
        {/* ... (your existing menu items) */}
      </section>
      <section className="md:flex flex-col md:flex-row md:justify-end text-left items-center md:text-center p-5">
        <div className={style.menuItem}>{currentUser.name?.split(" ")[0]}</div>
        <div className={style.userImageContainer}>
          <Image
            className={style.userImage}
            src={avatar}
            width={40}
            height={40}
          />
        </div>
        {currentAccount ? (
          <div>
            {currentAccount.slice(0, 6)}...{currentAccount.slice(39)}
          </div>
        ) : (
          <div className={style.loginButton} onClick={() => connectWallet()}>
            <BsPerson />
            <span className={style.loginText}>Log in</span>
          </div>
        )}
        <div className="relative inline-block text-left">
          <div>
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
              id="options-menu"
              aria-haspopup="true"
              aria-expanded="true"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {selectedChain}
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 12a1 1 0 0 1 .707.293l3 3a1 1 0 1 1-1.414 1.414L10 14.414l-2.293 2.293a1 1 0 0 1-1.414-1.414l3-3a1 1 0 0 1 .707-.293z"
                />
              </svg>
            </button>
          </div>
          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              {chainOptions.map((chain) => (
                <button
                  key={chain}
                  onClick={() => handleChainChange(chain)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  {chain}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
      <section className="md:hidden flex flex-col justify-end p-5 cursor-pointer">
        <AiOutlineMenu id="menuIcon" />
      </section>
      <Script src="navOps.js" strategy="lazyOnload" />
    </nav>
  );
};

export default Navbar;
