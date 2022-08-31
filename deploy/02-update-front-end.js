// This code updates the ABI and Contract Address of diferent networks to the FrontEnd

const { frontEndContractsFile, frontEndAbiFile } = require("../helper-hardhat-config")
const fs = require("fs")
const { network } = require("hardhat")

module.exports = async () => {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Writing to front end...")
        await updateContractAddresses()
        await updateAbi()
        console.log("Front end written!")
    }
}

async function updateAbi() {
    const bulkTransfer = await ethers.getContract("BulkTransfer")
    fs.writeFileSync(frontEndAbiFile, bulkTransfer.interface.format(ethers.utils.FormatTypes.json))
}

async function updateContractAddresses() {
    const bulkTransfer = await ethers.getContract("BulkTransfer")
    const contractAddresses = JSON.parse(fs.readFileSync(frontEndContractsFile, "utf8"))
    if (network.config.chainId.toString() in contractAddresses) {
        if (!contractAddresses[network.config.chainId.toString()].includes(bulkTransfer.address)) {
            contractAddresses[network.config.chainId.toString()].push(bulkTransfer.address)
        }
    } else {
        contractAddresses[network.config.chainId.toString()] = [bulkTransfer.address]
    }
    fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses))
}
module.exports.tags = ["all", "frontend"]
