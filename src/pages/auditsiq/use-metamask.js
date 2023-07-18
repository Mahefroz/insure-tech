import React, { useEffect, useRef, useState } from "react";
import { useMoralis } from "react-moralis";
import Moralis from "moralis";
import { ethers } from "ethers";
// import Web3 from "web3";
import { toast } from "react-toastify";
const useMetamask = () => {
  //   const {
  //     authenticate,
  //     isAuthenticated,
  //     isAuthenticating,
  //     user,
  //     account,
  //     isInitializing,
  //     isInitialized,
  //     isWeb3EnableLoading,
  //     logout,
  //     isWeb3Enabled,
  //   } = useMoralis();
  const [userBalance, setUserBalance] = useState(0);
  const [currentAddress, setCurrentAddress] = useState("");
  // const [updatedAt, setUpdatedAt] = useState("");
  // const [createdAt, setCreatedAt] = useState("");
  const [isPolygon, setIsPolygon] = useState(false);
  const [currentNetwork, setCurrentNetwork] = useState();
  // let web3;
  // if (window.ethereum) {
  //   web3 = new Web3(window.ethereum);
  // }
  // const rpcUrl = "https://polygon-rpc.com/"
  // const matic = "0x89"
  const rpcUrl = "https://rpc-mumbai.maticvigil.com/";
  const matic = "0x13881";
  const getChainId = async () => {
    const id = await ethers.provider
      .getNetwork()
      .then((network) => network.chainId);
    if (id == parseInt(matic, 16)) {
      setIsPolygon(true);
    } else if (id == parseInt(matic, 16)) {
      // infoHandler("Please change your Metamask Network to Polygon.", "Metamask")
    }
    return id;
  };
  if (window.ethereum) {
    window.ethereum.on("chainChanged", (chainId) => {
      if (chainId == matic) {
        setIsPolygon(true);
        setCurrentNetwork(chainId);
      } else if (chainId != matic) {
        setIsPolygon(false);
        setCurrentNetwork(chainId);
        // infoHandler(
        //  "Please change your Metamask Network to Polygon.",
        //  "Metamask"
        // )
      }
    });
  }
  const changeNetwork = async () => {
    try {
      const chainId = getChainId();
      if (chainId != parseInt(matic, 16)) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: matic,
              rpcUrls: [rpcUrl],
              chainName: "Polygon Mumbai",
              nativeCurrency: {
                name: "MATIC",
                symbol: "MATIC",
                decimals: 18,
              },
              blockExplorerUrls: ["https://polygonscan.com/"],
            },
          ],
        });
        if (chainId == parseInt(matic, 16)) setIsPolygon(true);
      }
    } catch (e) {
      // console.log(e)
    }
  };
  useEffect(() => {
    const func = async () => {
      let accounts;
      if (!window.ethereum) {
        return;
        // infoHandler("No Metamask Installed", "Metamask")
      } // web3.eth.getAccounts(function (err, accoun) {
      //  if (err != null)
      //    errorHandler(
      //      "Something went wrong please reload the page.",
      //      "Metamask"
      //    )
      //  else if (accoun.length == 0)
      //    infoHandler("Please login using metamask.", "Metamask")
      //  else if (accoun.length > 0) {
      //    accounts = accoun
      //  }
      // })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      accounts = await provider.listAccounts();
      let currentAccount;
      let isCurrentAccount;
      if (accounts) {
        if (accounts[0]) {
          currentAccount = accounts[0];
          isCurrentAccount = currentAccount.length != 0;
        }
      }
      // console.log(accounts, isWeb3EnableLoading, isWeb3Enabled)
      try {
        if (!isWeb3Enabled && !isWeb3EnableLoading && isCurrentAccount) {
          console.log("hi");
          await Moralis.enableWeb3().then(async () => {});
          await changeNetwork();
          await getChainId();
          await getUserData();
        }
      } catch (error) {
        console.log(error);
        toast.error("Please Connect Metamask using Continue button!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };
    func();
  }, [isWeb3Enabled]);
  const getUserData = async () => {
    // try {
    //   // console.log("his")
    //   if (account) {
    //     // await Moralis.enableWeb3();
    //     console.log("hi");
    //     const bal = await web3.eth.getBalance(account);
    //     const balance = web3.utils.fromWei(bal, "ether");
    //     // console.log(balance)
    //     setCurrentAddress(account);
    //     setUserBalance(balance);
    //     const userAddress = account;
    //     return {
    //       balance,
    //       userAddress,
    //     };
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
  };
  const connectHandler = async () => {
    try {
      if (!window.ethereum) {
        return toast.error("MetaMask not Found!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      if (!account) {
        console.log(account);
        await Moralis.enableWeb3();
        await changeNetwork();
      } else if (!isPolygon && account) {
        await changeNetwork().catch((e) => {
          console.log(e);
        });
      } else if (account && isPolygon) {
        toast.success("MetaMask Connected", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return account;
      }
      // const { balance, userAddress, createdAt, updatedAt } = await getUserData();
      return await getUserData();
    } catch (e) {
      console.log(e);
    }
  };
  const logOut = async () => {
    await logout();
    console.log("logged out");
  };
  return {
    logOut,
    connectHandler,
    currentAddress,
    userBalance,
    account,
    isPolygon,
    changeNetwork,
    currentNetwork,
  };
};
export default useMetamask;
