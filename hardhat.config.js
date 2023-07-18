require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
// const { projectId, mnemonic } = require("./src/secret.json");

const { API_URL, PRIVATE_KEY, API_KEY, API_KEY_ETHERSCAN } = process.env;


module.exports = {
  solidity: "0.8.1",
  networks: {
    hardhat: {},
    polygon: {
      url: "https://polygon-mainnet.infura.io",
      accounts: ["d4b23211147482b911d1e657f89fe2be5207d53e9181bbd10514db90c72bfda5"],
    },
  },
}
// module.exports = {
//   solidity: "0.8.9",
//   defaultNetwork: "polygon_mumbai",
//   networks: {
//     hardhat: {},
//     polygon_mumbai: {
//       url: API_URL,
//       accounts: [`0x${PRIVATE_KEY}`],
//     },
//   },
//   etherscan: {
//     apiKey: API_KEY,
//   },
// };
// require("@nomicfoundation/hardhat-toolbox");

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.17",
//   networks: {
//     localhost: {
//       live: false,
//       saveDeployments: true,
//       tags: ["local"],
//     },
//   },
// };
