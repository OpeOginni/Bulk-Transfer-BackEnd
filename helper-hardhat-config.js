const networkConfig = {
    31337: {
        name: "localhost",
    },
    5: {
        name: "goerli",
    },
}

const developmentChains = ["hardhat", "localhost"]
const frontEndContractsFile = "../Bulk-Transfer-FrontEnd/constants/contractAddresses.json"
const frontEndAbiFile = "../Bulk-Transfer-FrontEnd/constants/abi.json"

module.exports = {
    networkConfig,
    developmentChains,
    frontEndContractsFile,
    frontEndAbiFile,
}
