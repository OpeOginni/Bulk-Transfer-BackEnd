const { getNamedAccounts, deployments, network } = require("hardhat")
const { verify } = require("../utils/verify")
const { networkConfig } = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    log("----------------------------------------------------")
    log("Deploying BulkTransfer and waiting for confirmations...")
    const bulkTransfer = await deploy("BulkTransfer", {
        from: deployer,
        arg: [
            /*Address*/
        ],
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    log(`BulkTransfer deployed at ${bulkTransfer.address}`)

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(bulkTransfer.address, arguments)
    }

    // Instructions to running scripts

    log("Add Winner Addresses with command:")
    const networkName = network.name == "hardhat" ? "localhost" : network.name
    log(`yarn hardhat run scripts/addWinnersAddress.js --network ${networkName}`)
    log("----------------------------------------------------")
}

module.exports.tags = ["all", "bulkTransfer"]