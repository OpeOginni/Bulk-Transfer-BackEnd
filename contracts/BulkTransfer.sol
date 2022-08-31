// SPDX-License-Identifier: MIT
// 1. Pragma
pragma solidity ^0.8.0;

//error

error BulkTransfer__TransferAmountMoreThanDeposit();
error BulkTransfer__NotEnoughETH();
error BulkTransfer__NoWinnerAddressGiven();
error BulkTransfer__NotOwner();

/**@title A Bulk Transfer Smart Contract
 * @author Opeyemi Oginni
 * @notice This contract is for transfering funds from a user to multiple accounts in one transaction
 */
contract BulkTransfer {
    // State Variables
    mapping(address => uint256) private s_addressToAmountDeposited;
    mapping(address => address[]) private s_funderAddressToWinnersAddressArray;
    address private immutable i_owner;

    // Constructor
    constructor() {
        i_owner = msg.sender;
    }

    // Modifiers
    modifier onlyOwner() {
        // require(msg.sender == i_owner);
        if (msg.sender != i_owner) revert BulkTransfer__NotOwner();
        _;
    }

    //Adding Functions

    function addWinnersAddress(address[] memory _winnerAddresses) public {
        //arrWinnersWalletAddress = winnerAddresses;
        s_funderAddressToWinnersAddressArray[msg.sender] = _winnerAddresses;
    } // Note when putting in the value for the winnerAddresses They should start with ["0x0000","0x00001","0x00002"]

    //Payment Function

    function fundContract() public payable {
        s_addressToAmountDeposited[msg.sender] += msg.value;
    }

    function bulkPayment(uint256 rewardValue) external payable {
        uint256 i = 0;
        assert(1 ether == 1e18);
        assert(1 gwei == 1e9);
        address[] memory arrWinnersAddress = s_funderAddressToWinnersAddressArray[msg.sender];

        //Error Management
        if (s_funderAddressToWinnersAddressArray[msg.sender].length == 0)
            revert BulkTransfer__NoWinnerAddressGiven();

        /* GWEI */
        // if((s_funderAddressToWinnersAddressArray[msg.sender].length * rewardValue * 1 gwei) > s_addressToAmountDeposited[msg.sender]) revert BulkTransfer__TransferAmountMoreThanDeposit();

        /* ETHER */
        if (
            (arrWinnersAddress.length * rewardValue * 1 ether) >
            s_addressToAmountDeposited[msg.sender]
        ) revert BulkTransfer__TransferAmountMoreThanDeposit();

        for (i; i < arrWinnersAddress.length; i++) {
            (bool sent, ) = arrWinnersAddress[i].call{//value: rewardValue * 1 gwei /* GWEI */

            /* ETHER */
            value: rewardValue * 1 ether}("");

            //value: rewardValue
            require(sent, "Failed to send Ether");
        }

        /* GWEI */
        // s_addressToAmountDeposited[msg.sender] -= rewardValue * 1 gwei;

        /* ETHER */
        s_addressToAmountDeposited[msg.sender] -= rewardValue * 1 ether;

        // Reset Array

        delete s_funderAddressToWinnersAddressArray[msg.sender];

        /* This code here Prevents the following;
        1. Anyone from transfering an amount of ETH that is more than how much they deposited in the smart contract
        2. It updates this amountDeposited, so that it reduces as the particular user transfer his/her ETH
        3. The smart contract is basically like a bank for the user allowing the user to transfer only the ETH he/she deposited
        4. It Resets the Array of Winner Addresses for the Caller of the Function*/
    }

    //Getter Functions

    function getAmountDeposited() public view returns (uint256) {
        return s_addressToAmountDeposited[msg.sender];
    }

    function getWinnersLength() public view returns (uint256) {
        return s_funderAddressToWinnersAddressArray[msg.sender].length;
    }

    function getWinnersList() public view returns (address[] memory) {
        return s_funderAddressToWinnersAddressArray[msg.sender];
    }

    function getContractBalance() public view onlyOwner returns (uint256) {
        return address(this).balance;
    }
}
