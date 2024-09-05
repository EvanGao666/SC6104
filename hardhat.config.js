require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { SEPOLIA_API_URL, PRIVATE_KEY } = process.env;

module.exports = {
    solidity: "0.8.24",
    networks: {
        sepolia: {
            url: SEPOLIA_API_URL,
            accounts: [`0x${PRIVATE_KEY}`],
        },
    },
};
