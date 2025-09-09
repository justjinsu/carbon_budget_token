
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import * as dotenv from "dotenv";
dotenv.config();

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY || "";
const SEPOLIA_DEPLOYER_PRIVATE_KEY = process.env.SEPOLIA_DEPLOYER_PRIVATE_KEY || "";
const BASE_MAINNET_PRIVATE_KEY = process.env.BASE_MAINNET_PRIVATE_KEY || "";
const BASE_SEPOLIA_PRIVATE_KEY = process.env.BASE_SEPOLIA_PRIVATE_KEY || "";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: { optimizer: { enabled: true, runs: 200 } }
  },
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: SEPOLIA_DEPLOYER_PRIVATE_KEY ? [SEPOLIA_DEPLOYER_PRIVATE_KEY] : []
    },
    base: {
      url: "https://mainnet.base.org",
      accounts: BASE_MAINNET_PRIVATE_KEY ? [BASE_MAINNET_PRIVATE_KEY] : []
    },
    "base-sepolia": {
      url: "https://sepolia.base.org",
      accounts: BASE_SEPOLIA_PRIVATE_KEY ? [BASE_SEPOLIA_PRIVATE_KEY] : []
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY || ""
  }
};

export default config;
