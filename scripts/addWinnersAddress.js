const { impersonateAccount } = require("@nomicfoundation/hardhat-network-helpers")
const { ethers, getNamedAccounts } = require("hardhat")

async function addWinnersAddress() {
    // Having Problems with getNamedAccount function
    const { deployer } = await getNamedAccounts()
    const { winnerAccount1 } = await getNamedAccounts(1)

    const arrayOfWinnerAccounts = `["${winnerAccount1}"]`
    const bulkTransfer = await ethers.getContractAt("BulkTransfer", deployer)
    console.log(`Got contract BulkTransfer at ${bulkTransfer.address}`)
    await bulkTransfer.addWinnersAddress(arrayOfWinnerAccounts)
    console.log("Winner Address Added!")
}

addWinnersAddress()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
