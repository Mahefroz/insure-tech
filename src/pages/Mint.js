import React from "react";
import { ThreeDots } from "react-loader-spinner";
import contract from "/artifacts/contracts/Insurance.sol/Insurance.json";
import { File } from "web3.storage";
import { Web3Storage } from "web3.storage";
import styles from "./mint.module.css";
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

const Mint = () => {
  const [loading, setLoading] = React.useState(false);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEQ2OWE0QWZiN0EyNEJDYjVkODg4NDkyNjdhMTU0Mzk2MEM4MDMzZEYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzU3NTYwMDkyNDEsIm5hbWUiOiJJbnN1cmFuY2VCcm9rZXIifQ.MYDpt25pk5pJkoBMBBN8HJAbh5L64aHeZnlvdLiMTO0";

  const router = useRouter();
  console.log("Prop", router.query.udata, router.query.pdata);
  const udata = JSON.parse(router.query.udata);
  const pdata = JSON.parse(router.query.pdata);
  console.log("User data object", udata);
  const rate = "0.00016";
  //   const [data, setData] = React.useState({
  //     userId: 13,
  //     userName: "Ayesha",
  //     carName: "Toyota",
  //     carPrice: 1000,
  //     policy: 0,
  //     premium: 2000,
  //   });
  const [allUsers, setAllUsers] = React.useState([]);
  const [url, setUrl] = React.useState("");
  const [cid, setCid] = React.useState("");
  const [filename, setfilename] = React.useState("");
  const [data, setData] = React.useState({
    userId: 1,
    userName: udata.userName,
    userAge: udata.userAge,
    carName: udata.carName,
    carRegNo: udata.carRegNo,
    regRegion: udata.regRegion,
    carType: udata.carType,
    carMake: udata.carMake,
    carYear: udata.carYear,
    carPrice: udata.carPrice,
    driverLicense: udata.driverLicense,
  });
  const [policyData, setPolicyData] = React.useState({
    policyId: null,
    policyType: pdata.policyType,
    policyPayor: pdata.policyPayor,
    premiumAmount: pdata.premiumAmount,
    orderStatus: pdata.orderStatus,
    premiumPaid: pdata.premiumPaid,
    balance: pdata.balance,
  });
  console.log("Data", data);

  const { ethereum } = window;
  const contractAddress = "0x0165878A594ca255338adfa4d48449f69242Eb8F";
  const abi = contract.abi;
  const [instance, setInstance] = useState(null);
  const [purchased, setPurchased] = useState(false);
  const [paid, setPaid] = useState(false);
  const [connected, setConnected] = useState(false);
  const [nftAdded, setNftAdded] = useState(false);
  const [account, setAccount] = useState([]);
  const getContractInstance = async () => {
    if (typeof window !== undefined) {
      // browser code

      if (ethereum) {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        await setAccount(accounts);

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const insuranceContract = new ethers.Contract(
          contractAddress,
          abi,
          signer
        );
        if (accounts.length != 0) {
          //   await setCustomer(accounts[0]);
          await setInstance(insuranceContract);
          await setConnected(true);
        }
        console.log("Instance", accounts, insuranceContract, provider, signer);
        // await setInstance(insuranceContract);
        // createToken();
        await setId();
      }
    }
  };
  const purchaseToken = async () => {
    if (typeof window !== undefined) {
      // browser code

      if (ethereum) {
        // const accounts = await ethereum.request({
        //   method: "eth_requestAccounts",
        // });
        // await setAccount(accounts);
        // console.log("Selected account", accounts);
        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        // const signer = provider.getSigner();
        // const signerAddress = await signer.getAddress();
        // console.log(signerAddress);

        // const insuranceContract = new ethers.Contract(
        //   contractAddress,
        //   abi,
        //   signer
        // );
        // // await setInstance(insuranceContract);

        // console.log("Contract Instance", insuranceContract);

        const payment = ethers.utils.parseEther(
          (policyData.premiumAmount * rate).toString()
        );
        console.log("value", payment);

        // try {
        const options = {
          gasPrice: ethers.utils.parseUnits("50", "gwei"),
          gasLimit: 1000000,
        };
        console.log(
          "Payload",
          data.userId,
          data.userName,
          data.carName,
          data.carPrice,
          policyData.policyType,
          payment
        );
        const result = await instance.addToken(
          data.userId,
          data.userName,
          data.carName,
          data.carPrice,
          policyData.policyType,
          payment,

          {
            value: payment,
          }
        );
        const receipt = await result.wait();

        console.log(`Transaction confirmed: ${receipt.transactionHash}`);
        // Check receipt.status to see if the transaction was successful
        if (receipt.status === 1) {
          setPurchased(true);
          setPaid(true);

          console.log("Transaction successful!");
          await swal("Token minted!", `Token ID:${data.userId}`, "success");
        } else {
          await swal("Transaction failed!", "", "error");
          setLoading(false);

          //   console.log("Transaction failed!");
        }

        // } catch (error) {
        //   console.error("Token add failed", error.msg);
        // }
      }
    }
  };

  const addToken = async () => {
    makeStorageClient();
    const metadata = await makeFileObjects();
    console.log("Returned files", metadata);
    await storeFiles(metadata);
    console.log("Metadata", data.userId, url);
    const addNft = await instance.addMetadata(1, url);
    await setPaid(true);
    console.log("Nft added", cid, addNft);
    setLoading(false);
    await setNftAdded(true);
  };
  const getAccessToken = () => {
    return token;
  };

  const makeStorageClient = () => {
    return new Web3Storage({ token: getAccessToken() });
  };
  let f_name;
  const makeFileObjects = async () => {
    // console.log("Mapping data", user, userPolicy);
    const user_obj = data;
    const p_obj = policyData;

    //   const obj = { data };
    const buffer1 = Buffer.from(JSON.stringify(user_obj));
    const buffer2 = Buffer.from(JSON.stringify(p_obj));
    f_name = data.userId + "_" + data.userName + ".json";
    console.log("filename", f_name);
    // await setfilename(f_name);

    const files = [
      // new File(["contents-of-file-1"], "plain-utf8.txt"),
      new File([buffer1, buffer2], f_name),
    ];
    console.log("Files", files);
    return files;
  };

  const storeFiles = async (metadata) => {
    console.log("Users in store", data);
    const client = makeStorageClient();
    console.log("Client", client);
    const c_id = await client.put(metadata);
    console.log("stored metadata with cid:", c_id);
    if (c_id != undefined) {
      await setCid(c_id);
      const tokenUrl = "https://w3s.link/ipfs" + "/" + c_id + "/" + f_name;
      console.log("Token URL", tokenUrl);
      await setUrl(tokenUrl);
    }
  };
  const setId = async () => {
    // setLoading(true);
    const getLength = await instance?.callStatic.totalUsers();
    let uLength = Number(getLength?.toString());

    console.log("Users in token", Number(getLength?.toString()));
    let len = uLength + 1;

    // user_id = user_id + 1;
    console.log("Setting id", len);
    // await setUserLength(len);
    await setData({ ...data, ["userId"]: len });
    await setPolicyData({ ...policyData, ["policyId"]: len });
    setLoading(false);
  };
  useEffect(() => {
    // getContractInstance();
    // setId();
  }, []);
  useEffect(() => {
    makeStorageClient();
    // setId();
  }, []);

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
      {loading ? (
        <Box className={styles.loader}>
          <ThreeDots color="blue" />
        </Box>
      ) : (
        <div>
          <h1 align="center">Purchase Summary</h1>
          <h6 align="center" style={{ color: "green" }}>
            {account}
          </h6>
          <div style={{ marginTop: "20px" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                {/* <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>User Name</TableCell>
                  <TableCell>Car Name</TableCell>
                  <TableCell>Car Price</TableCell>
                  <TableCell>Insurance Policy</TableCell>
                  <TableCell>Premium </TableCell>
                  <TableCell>Purchase Status</TableCell>
                </TableRow>
              </TableHead> */}
                <TableBody>
                  <TableRow
                    // key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      Customer ID
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {data.userId}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    // key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      Customer Name
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {data.userName}
                    </TableCell>
                    <TableCell align="right" component="th" scope="row">
                      <Box></Box>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    // key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      Car Name
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {data.carName}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    // key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      Car Price
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {data.carPrice}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    // key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      Premium Amount
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {policyData.premiumAmount} - AED
                    </TableCell>
                    <TableCell
                      style={{ fontWeight: "bold" }}
                      component="th"
                      scope="row"
                    >
                      Premium Amount in ETH
                    </TableCell>
                    <TableCell
                      style={{ color: "red" }}
                      component="th"
                      scope="row"
                    >
                      {policyData.premiumAmount * rate} - ETH
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {paid === true ? (
                <Box
                  align="right"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <h4 align="right" style={{ marginRight: "60px" }}>
                    Policy ID : {data.userId}
                  </h4>
                  <h4 align="right" style={{ marginRight: "60px" }}>
                    NFT Metadata: {url}
                  </h4>
                </Box>
              ) : (
                ""
              )}

              {/* {connected ? (
            <Box style={{ display: "flex", flexDirection: "row" }}>
              <Button
                size="small"
                variant="contained"
                style={{ margin: "10px", backgroundColor: "#42f545" }}
                onClick={() => {}}
              >
                Connected
              </Button>
            </Box>
          ) : (
            <Button
              size="small"
              variant="contained"
              style={{ margin: "10px" }}
              onClick={() => {
                getContractInstance();
                //   token();
              }}
            >
              Connect Metamask
            </Button>
          )} */}

              <Box align="right">
                {nftAdded === false ? (
                  <Box>
                    {purchased == false ? (
                      <Button
                        size="small"
                        variant="contained"
                        className={styles.pBtn}
                        onClick={() => {
                          setLoading(true);
                          getContractInstance();
                          if (data.userId != null || data.userId != undefined) {
                            // setLoading(false);
                            purchaseToken();
                          }
                        }}
                      >
                        Purchase
                      </Button>
                    ) : (
                      <Button
                        size="small"
                        variant="contained"
                        className={styles.pBtn}
                        onClick={() => {
                          setLoading(true);
                          addToken();
                        }}
                      >
                        Get NFT
                      </Button>
                    )}
                  </Box>
                ) : (
                  <Box>
                    <Button
                      size="small"
                      variant="contained"
                      className={styles.backBtn}
                      onClick={() => {
                        setConnected(false);
                        setNftAdded(false);
                        setPurchased(false);
                        setPaid(false);

                        router.push({
                          pathname: "/Nft",
                        });
                      }}
                    >
                      Back
                    </Button>
                  </Box>
                )}
                {/* <Button
              size="small"
              variant="contained"
              className={styles.pBtn}
              onClick={() => {
                router.push({
                  pathname: "/Nft",
                });
              }}
            >
              Back
            </Button> */}
              </Box>
            </TableContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default Mint;

//  const getContractInstance = async () => {
//    if (typeof window !== undefined) {
//      // browser code

//      if (ethereum) {
//        const accounts = await ethereum.request({
//          method: "eth_requestAccounts",
//        });
//        await setAccount(accounts);

//        const provider = new ethers.providers.Web3Provider(ethereum);
//        const signer = provider.getSigner();
//        const insuranceContract = new ethers.Contract(
//          contractAddress,
//          abi,
//          signer
//        );
//        if (accounts.length != 0) {
//          await setCustomer(accounts[0]);
//          // await setConnected(true);
//        }
//        console.log("Instance", accounts, insuranceContract, provider, signer);
//        await setInstance(insuranceContract);
//        createToken();
//      }
//    }
//  };
const createToken = async () => {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://localhost:8545"
  );
  const signer = provider.getSigner();

  const address = await signer.getAddress();
  console.log("Signer", address);
  const contract = new ethers.Contract(contractAddress, abi, signer);

  try {
    const result = await contract.addToken(
      data.userId,
      data.userName,
      data.carName,
      data.carPrice,
      data.policy,
      ethers.utils.parseEther(data.premium * rate.toString())
    );
    console.log("Token added", result);
  } catch (error) {
    console.error("Token add failed", error.msg);
  }
  // try {
  //   const result = await contract.callStatic.addToken(
  //     data.userId,
  //     data.userName,
  //     data.carName,
  //     data.carPrice,
  //     data.policy,
  //     ethers.utils.parseEther(data.premium * rate.toString())
  //   );
  //   console.log("Token added", result[1].premium.toString());
  // } catch (error) {
  //   console.error("Token add failed", error.msg);
  // }
};
//   console.log("Customer", customer);
//  const purchase = async () => {
//    console.log("User details", data);
//    if (ethereum) {
//      const accounts = await ethereum.request({
//        method: "eth_requestAccounts",
//      });
//      try {
//        // await setAccount(accounts);
//        console.log("Selected account", accounts);
//        // const provider = new ethers.providers.Web3Provider(window.ethereum);
//        const provider = new ethers.providers.Web3Provider(window.ethereum);
//        const signer = provider.getSigner();
//        const signerAddress = await signer.getAddress();
//        console.log(signerAddress);
//        const insuranceContract = new ethers.Contract(
//          contractAddress,
//          abi,
//          signer
//        );
//        //   const contractAddress = "0x1234567890123456789012345678901234567890"; // replace with the contract address
//        //   const contract = new ethers.Contract(contractAddress, abi, signer);
//        //   const value = data.premium * rate;
//        const amount = ethers.utils.parseEther((data.premium * rate).toString());

//        //   const valueInWei = ethers.utils.parseEther(value.toString()); // convert the value to Wei

//        const transaction = await insuranceContract.mint(
//          "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
//          data.userId,
//          "https://bafybeiedv7sowwxamly4oicivudp45rsfvbklnf3fvbvonxrwoxqylhtwq.ipfs.w3s.link/0.json",
//          {
//            value: amount,
//          }
//        );

//        await transaction.wait();

//        console.log("Transaction successful", transaction);
//        const transactionStatic = await insuranceContract.callStatic.mint(
//          "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
//          data.userId,
//          "https://bafybeiedv7sowwxamly4oicivudp45rsfvbklnf3fvbvonxrwoxqylhtwq.ipfs.w3s.link/0.json",
//          {
//            value: amount,
//          }
//        );
//        console.log("Static mint", transactionStatic);
//      } catch (error) {
//        console.log(error);
//        console.log("Transaction failed", error.msg);
//      }
//    }
//  };
