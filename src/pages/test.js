import React from "react";
import { Button } from "@mui/material";
import CryptoConvert from "crypto-convert";
const convert = new CryptoConvert({
  cryptoInterval: 10000, //Crypto prices update interval in ms (default 5 seconds on Node.js & 15 seconds on Browsers)
  fiatInterval: 60 * 1e3 * 60, //Fiat prices update interval (default every 1 hour)
  calculateAverage: true, //Calculate the average crypto price from exchanges
  binance: true, //Use binance rates
  bitfinex: true, //Use bitfinex rates
  coinbase: true, //Use coinbase rates
  kraken: true, //Use kraken rates
});
const test = () => {
  const url =
    "https://exchange-rates.abstractapi.com/v1/live/?api_key=8236179388154492a1e3ab48b92bfa94&base=USD&target=EUR";

  const httpGetAsync = async (url, callback) => {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
        callback(xmlHttp.responseText);
    };
    xmlHttp.open("GET", url, true); // true for asynchronous
    xmlHttp.send(null);
  };

  const exchange = async () => {
    await convert.ready(); //Wait for the initial cache to load
    const rate = convert.ETH.JPY(255);
    // const rate = convert.ETH.AED(1);
    console.log("Rate", rate);

    //   convert.LINK.LTC(5);
    //   convert.USD.CRO(100.1256);

    //... convert any pair
    // prices are automatically updated on background
  };
  console.log(convert.list);
  // const provider = new ethers.providers.JsonRpcProvider(
  //   "http://localhost:8545"
  // );
  // try {
  //   // Get the signer with the private key
  //   const privateKey =
  //     "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
  //   const signer = new ethers.Wallet(privateKey, provider);

  //   // Get the contract instance

  //   const contract = new ethers.Contract(contractAddress, abi, signer);

  //   // Call the non-payable function and sign the transaction
  //   const transaction = await contract.addToken(
  //     data.userId,
  //     data.userName,
  //     data.carName,
  //     data.carPrice,
  //     data.policy,
  //     data.premium
  //   );
  //   const signedTransaction = await signer.signTransaction(transaction);
  //   console.log("Signed Transaction hash", signedTransaction);
  //   // Send the signed transaction
  //   const tx = await provider.sendTransaction(signedTransaction);
  //   console.log("My Transaction hash", tx.hash);

  //   // Set the transaction hash
  // } catch (error) {
  //   // Set the error message
  //   console.log(error.message);
  // }
  return (
    <div>
      <Button
        size="small"
        variant="contained"
        style={{ margin: "10px" }}
        onClick={() => {
          httpGetAsync(url);
        }}
      >
        Exchange
      </Button>
    </div>
  );
};

export default test;
// const provider = new ethers.providers.JsonRpcProvider(
//   "http://localhost:8545"
// );
// try {
//   // Get the signer with the private key
//   const privateKey =
//     "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
//   const signer = new ethers.Wallet(privateKey, provider);

//   // Get the contract instance

//   const contract = new ethers.Contract(contractAddress, abi, signer);

//   // Call the non-payable function and sign the transaction
//   const transaction = await contract.addToken(
//     data.userId,
//     data.userName,
//     data.carName,
//     data.carPrice,
//     data.policy,
//     data.premium
//   );
//   const signedTransaction = await signer.signTransaction(transaction);
//   console.log("Signed Transaction hash", signedTransaction);
//   // Send the signed transaction
//   const tx = await provider.sendTransaction(signedTransaction);
//   console.log("My Transaction hash", tx.hash);

//   // Set the transaction hash
// } catch (error) {
//   // Set the error message
//   console.log(error.message);
// }

// const provider = new ethers.providers.Web3Provider(window.ethereum);
// const signer = provider.getSigner();

// // Step 2: Obtain the signer's address
// const sender = await signer.getAddress();
// const contract = new ethers.Contract(contractAddress, abi, signer);
// // Step 3: Estimate gas required
// const gasEstimate = await contract.estimateGas.addToken(
//   data.userId,
//   data.userName,
//   data.carName,
//   data.carPrice,
//   data.policy,
//   data.premium
// );
// console.log("Gas estimate", gasEstimate);
// // const data = contract.interface.encodeFunctionData('addToken', [data.userId,
// //       data.userName,
// //       data.carName,
// //       data.carPrice,
// //       data.policy,
// //       data.premium]);
// // Step 4: Construct and sign the transaction
// const tx = {
//   to: contractAddress,
//   gasLimit: gasEstimate,
//   gasPrice: ethers.utils.parseUnits("10", "gwei"),
//   data: contract.interface.encodeFunctionData("addToken", [
//     data.userId,
//     data.userName,
//     data.carName,
//     data.carPrice,
//     data.policy,
//     data.premium,
//   ]),
// };
// // console.log("signed tx", signedTx);

// const signedTx = await signer.signTransaction(tx);
// console.log("signed tx", signedTx);

// // Step 4 (continued): Send the signed transaction
// const txResponse = await provider.sendTransaction(signedTx);

// console.log(`Transaction sent: ${txResponse.hash}`);
