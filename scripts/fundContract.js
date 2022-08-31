const { ethers, getNamedAccounts } = require("hardhat")

async function fundContract() {
    const { deployer } = await getNamedAccounts()
    const bulkTransfer = await ethers.getContract("BulkTransfer", deployer)
    console.log(`Got contract BulkTransfer at ${bulkTransfer.address}`)
    console.log("Funding contract...")
    const transactionResponse = await bulkTransfer.fundContract({
        value: ethers.utils.parseEther("0.1"),
    })
    await transactionResponse.wait()
    console.log("Funded!")
}

fundContract()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
