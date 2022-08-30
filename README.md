# ETH Bulk Transfer

This is a simple Solidity Smart Contract to help you send ETH to multiple accounts all in one. All you have to do is to manually input the Wallet Address you want to send the funds to, then put in the desired amount to send to each of them.

# Getting Started

## Requirements

NOTE: These are previous requirements without the front end, where you can copy the code and put in the Remix IDE to test it out.

- [Remix - Ethereum IDE] (remix-project.org)
  - You can check The Remix Documentation [Here] (https://remix-ide.readthedocs.io/)

# Usage

On Remix Deploy the contract. Get familiar with the FUNCTIONS

## Functions

- `addWinnersAddress` - This adds Wallet Addresses that are inputed into an array, from this array are all Addresses to be funded.
- `fundContract` - This is used to Fund the Smart Contract.
- `bulkPayment` - This function takes an Integer, which stands as the amount in ETH that all the accounts in the `arrWinnersWalletAddress` array will be funded with.
- `getContractBalanace` - This function is used to get the balance of the contract. (Note as ETH will be in 18 Decimal places)
- `getWinnersLength` - This functions shows the numbr of Addresses to be funded.
- `getWinnersAddress` - This function lists all Addresses to be funded. (It is Private by default, you can change it if you want)

# Network

On Remix you can make use of the Remix VM, you can still make use of your Metamask with either Real ETH or [Testnet ETH] (https://faucets.chain.link/)

# Next Stage

I'll try to Deploy on HardHat with JavaScript, plus to make it support BUSD so that someone can transfer BEP20 Tokens in Bulk

# Thank you!
