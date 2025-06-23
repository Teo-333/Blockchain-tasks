require('dotenv').config();
require('@nomiclabs/hardhat-ethers');

const PRIVATE_KEY = process.env.PRIVATE_KEY || '';
const SEPOLIA_RPC = process.env.SEPOLIA_RPC || '';

module.exports = {
  solidity: '0.8.24',
  networks: {
    sepolia: {
      url: SEPOLIA_RPC,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },
};
