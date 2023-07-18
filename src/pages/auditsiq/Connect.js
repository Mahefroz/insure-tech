import React from "react";
import { ThreeDots } from "react-loader-spinner";
// import contract from "/artifacts/contracts/aiq.sol/aiq.json";
import { File } from "web3.storage";
import { Web3Storage } from "web3.storage";
// import styles from "./mint.module.css";
import { ethers } from "ethers";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Swal from "sweetalert";
import Paper from "@mui/material/Paper";

const Connect = () => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const [url, setUrl] = React.useState("");
  const [cid, setCid] = React.useState("");
  const [filename, setfilename] = React.useState("");

  // const { ethereum } = window;
  // const contractAddress = "0xC59F19014AAD9E860B13aeA5d213906C3087710f";
  // const abi = contract.abi;
  const [instance, setInstance] = useState(null);
  const [purchased, setPurchased] = useState(false);
  const [paid, setPaid] = useState(false);
  const [connected, setConnected] = useState(false);
  const [nftAdded, setNftAdded] = useState(false);
  const [account, setAccount] = useState([]);

  const getContractInstance = async () => {
    if (typeof window !== undefined) {
      if (ethereum) {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("Accounts", accounts);
        // await setAccount(accounts);
        // const alchemyProvider = new ethers.providers.AlchemyProvider(
        //   "Network.MATIC_MUMBAI",
        //   "oXGi1fNe-zcHhhYzvLykg4tGFs2jiDyQ"
        // );
        // const accounts = await ethereum.request({
        //   method: "eth_requestAccounts",
        // });

        // const provider = new ethers.providers.JsonRpcProvider(
        //   "https://polygon-mainnet.infura.io"
        // );

        const provider = new ethers.providers.Web3Provider(ethereum);
        console.log("Provider", provider);
        const signer = await provider.getSigner();
        console.log("Signer", signer);

        const address = await signer.getAddress();
        console.log("Connected to MetaMask with address:", address);
        // const [deployer] = await ethers.getSigners();

        console.log("Account balance:", (await signer.getBalance()).toString());
        //   console.log("Accounts:", accounts);
        // if (accounts.length != 0) {
        //   //   await setCustomer(accounts[0]);
        //   await setInstance(insuranceContract);
        //   await setConnected(true);
        // }
        // console.log("Instance", accounts, contract, provider, signer);

        // try {
        //   const options = {
        //     gasPrice: ethers.utils.parseUnits("50", "gwei"),
        //     gasLimit: 1000000,
        //   };
        //   const cid = "abcdfef";
        //   const result = await contract.addToken(cid);
        //   const receipt = await result.wait();

        //   console.log(`Transaction confirmed: ${receipt.transactionHash}`);
        //   // Check receipt.status to see if the transaction was successful
        //   if (receipt.status === 1) {
        //     setPurchased(true);
        //     setPaid(true);

        //     console.log("Transaction successful!");
        //     await swal("Token minted!", `Token ID:${data.userId}`, "success");
        //   } else {
        //     await swal("Transaction failed!", "", "error");
        //     setLoading(false);

        //     //   console.log("Transaction failed!");
        //   }
        // } catch (error) {
        //   console.error("Token add failed", error.msg);
        // }

        // await setInstance(insuranceContract);
        // createToken();
        // await setId();
      }
    }
  };
  //   const purchaseToken = async () => {
  //     if (typeof window !== undefined) {
  //       // browser code

  //       if (ethereum) {
  //         // const accounts = await ethereum.request({
  //         //   method: "eth_requestAccounts",
  //         // });
  //         // await setAccount(accounts);
  //         // console.log("Selected account", accounts);
  //         // const provider = new ethers.providers.Web3Provider(window.ethereum);
  //         // const signer = provider.getSigner();
  //         // const signerAddress = await signer.getAddress();
  //         // console.log(signerAddress);

  //         // const insuranceContract = new ethers.Contract(
  //         //   contractAddress,
  //         //   abi,
  //         //   signer
  //         // );
  //         // // await setInstance(insuranceContract);

  //         // console.log("Contract Instance", insuranceContract);

  //         const payment = ethers.utils.parseEther(
  //           (policyData.premiumAmount * rate).toString()
  //         );
  //         console.log("value", payment);

  //   try {
  //   const options = {
  //     gasPrice: ethers.utils.parseUnits("50", "gwei"),
  //     gasLimit: 1000000,
  //   };
  //   console.log(
  //     "Payload",
  //     data.userId,
  //     data.userName,
  //     data.carName,
  //     data.carPrice,
  //     policyData.policyType,
  //     payment
  //   );
  //   const result = await instance.addToken(
  //     data.userId,
  //     data.userName,
  //     data.carName,
  //     data.carPrice,
  //     policyData.policyType,
  //     payment,

  //     {
  //       value: payment,
  //     }
  //   );
  //   const receipt = await result.wait();

  //   console.log(`Transaction confirmed: ${receipt.transactionHash}`);
  //   // Check receipt.status to see if the transaction was successful
  //   if (receipt.status === 1) {
  //     setPurchased(true);
  //     setPaid(true);

  //     console.log("Transaction successful!");
  //     await swal("Token minted!", `Token ID:${data.userId}`, "success");
  //   } else {
  //     await swal("Transaction failed!", "", "error");
  //     setLoading(false);

  //     //   console.log("Transaction failed!");
  //   }

  //   } catch (error) {
  //     console.error("Token add failed", error.msg);
  //   }
  // }
  //     }
  //   };

  //   const addToken = async () => {
  //     makeStorageClient();
  //     const metadata = await makeFileObjects();
  //     console.log("Returned files", metadata);
  //     await storeFiles(metadata);
  //     console.log("Metadata", data.userId, url);
  //     const addNft = await instance.addMetadata(1, url);
  //     await setPaid(true);
  //     console.log("Nft added", cid, addNft);
  //     setLoading(false);
  //     await setNftAdded(true);
  //   };
  //   const getAccessToken = () => {
  //     return token;
  //   };

  //   const makeStorageClient = () => {
  //     return new Web3Storage({ token: getAccessToken() });
  //   };
  //   let f_name;
  //   const makeFileObjects = async () => {
  //     // console.log("Mapping data", user, userPolicy);
  //     const user_obj = data;
  //     const p_obj = policyData;

  //     //   const obj = { data };
  //     const buffer1 = Buffer.from(JSON.stringify(user_obj));
  //     const buffer2 = Buffer.from(JSON.stringify(p_obj));
  //     f_name = data.userId + "_" + data.userName + ".json";
  //     console.log("filename", f_name);
  //     // await setfilename(f_name);

  //     const files = [
  //       // new File(["contents-of-file-1"], "plain-utf8.txt"),
  //       new File([buffer1, buffer2], f_name),
  //     ];
  //     console.log("Files", files);
  //     return files;
  //   };

  //   const storeFiles = async (metadata) => {
  //     console.log("Users in store", data);
  //     const client = makeStorageClient();
  //     console.log("Client", client);
  //     const c_id = await client.put(metadata);
  //     console.log("stored metadata with cid:", c_id);
  //     if (c_id != undefined) {
  //       await setCid(c_id);
  //       const tokenUrl = "https://w3s.link/ipfs" + "/" + c_id + "/" + f_name;
  //       console.log("Token URL", tokenUrl);
  //       await setUrl(tokenUrl);
  //     }
  //   };
  //   const setId = async () => {
  //     // setLoading(true);
  //     const getLength = await instance?.callStatic.totalUsers();
  //     let uLength = Number(getLength?.toString());

  //     console.log("Users in token", Number(getLength?.toString()));
  //     let len = uLength + 1;

  //     // user_id = user_id + 1;
  //     console.log("Setting id", len);
  //     // await setUserLength(len);
  //     await setData({ ...data, ["userId"]: len });
  //     await setPolicyData({ ...policyData, ["policyId"]: len });
  //     setLoading(false);
  //   };

  //   const handleAccountsChanged = () => {
  //     if (account.length === 0) {
  //       setAccount([]);
  //       // User has disconnected from Metamask manually
  //     } else {
  //       setAccount(account);
  //     }
  //   };
  //   useEffect(() => {
  //     if (window.ethereum) {
  //       window.ethereum
  //         .request({ method: "eth_requestAccounts" })
  //         .then((accounts) => {
  //           setAccount(accounts);
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });

  //       window.ethereum.on("accountsChanged", handleAccountsChanged);

  //       return () => {
  //         window.ethereum.removeListener(
  //           "accountsChanged",
  //           handleAccountsChanged
  //         );
  //       };
  //     }
  //   }, []);

  return (
    <>
      <div>
        <h1 align="center">Purchase Summary</h1>
        <div sx={{ display: "flex", alignItems: "flex-end" }}>
          <Button
            size="small"
            variant="contained"
            //   className={styles.pBtn}
            onClick={() => {
              getContractInstance();
            }}
          >
            Connect Metamask
          </Button>
        </div>
      </div>
    </>
  );
};

export default Connect;

// const createToken = async () => {
//   const provider = new ethers.providers.JsonRpcProvider(
//     "http://localhost:8545"
//   );
//   const signer = provider.getSigner();

//   const address = await signer.getAddress();
//   console.log("Signer", address);
//   const contract = new ethers.Contract(contractAddress, abi, signer);

//   try {
//     const result = await contract.addToken(
//       data.userId,
//       data.userName,
//       data.carName,
//       data.carPrice,
//       data.policy,
//       ethers.utils.parseEther(data.premium * rate.toString())
//     );
//     console.log("Token added", result);
//   } catch (error) {
//     console.error("Token add failed", error.msg);
//   }
// };
