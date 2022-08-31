const networkConfig = {
    default: {
        name: "hardhat",
    },
    31337: {
        name: "localhost",
        minimumDeposit: "1000000000000000", // 0.001 ETH
    },
    5: {
        name: "goerli",
        minimumDeposit: "1000000000000000", // 0.001 ETH
    },
    1: {
        name: "mainnet",
        minimumDeposit: "10000000000000", // 0.00001 ETH
    },
}

const developmentChains = ["hardhat", "localhost"]
const VERIFICATION_BLOCK_CONFIRMATIONS = 6
const frontEndContractsFile = "../bulk-transfer-frontend/constants/contractAddresses.json"
const frontEndAbiFile = "../bulk-transfer-frontEnd/constants/abi.json"

module.exports = {
    networkConfig,
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
    frontEndContractsFile,
    frontEndAbiFile,
}
