const { getNamedAccounts, deployments, network } = require("hardhat")
const { verify } = require("../utils/verify")
const {
    networkConfig,
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
} = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS

    log("----------------------------------------------------")
    log("Deploying BulkTransfer and waiting for confirmations...")
    const bulkTransfer = await deploy("BulkTransfer", {
        from: deployer,
        arg: [
            /*Address*/
        ],
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })
    log(`BulkTransfer deployed at ${bulkTransfer.address}`)

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(bulkTransfer.address)
    }

    // Instructions to running scripts
    log("----------------------------------------------------")

    log("Fund Contract with command:")
    const networkName01 = network.name == "hardhat" ? "localhost" : network.name
    log(`yarn hardhat run scripts/fundContract.js --network ${networkName}`)
    log("----------------------------------------------------")

    log("Perform Bulk Transfer with command:")
    const networkName02 = network.name == "hardhat" ? "localhost" : network.name
    log(`yarn hardhat run scripts/bulkTransfer.js --network ${networkName}`)
    log("----------------------------------------------------")
}

module.exports.tags = ["all", "bulkTransfer"]
