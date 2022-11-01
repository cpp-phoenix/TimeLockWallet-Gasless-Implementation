// SPDX-License-Identifier: MIT

pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TimelockWallet {

    using SafeMath for uint;

    struct TokenStakingDetail {
        uint locktime;
        uint balances;
    }
    
    mapping(address => mapping(address => TokenStakingDetail)) private userToTokenMapping;
    
    mapping(address => TokenStakingDetail) private etherBalances;

    event depositEtherEvent(address indexed senderAddress, uint amount, uint totalStaked, uint locktime);

    event depositTokenEvent(address indexed tokenContract, address indexed senderAddress, uint amount, uint totalStaked, uint locktime);

    event withdrawEtherEvent(address indexed senderAddress, uint amount, uint totalStaked);

    event withdrawTokenEvent(address indexed tokenContract, address indexed senderAddress, uint amount, uint totalStaked);

    function depositEther() public payable {

        require(msg.value > 0, "Deposit amount should be greater than zero");

        //update user balances
        etherBalances[msg.sender].balances += msg.value;

        etherBalances[msg.sender].locktime = block.timestamp + 2 minutes;

        emit depositEtherEvent(msg.sender, msg.value, etherBalances[msg.sender].balances, etherBalances[msg.sender].locktime);
    }

    function depsitToken(address _tokenContract, uint _amount) public {
        ERC20 parsedTokenContract = ERC20(_tokenContract);

        require(_amount > 0, "Deposit amount should be greater than zero");
        require(parsedTokenContract.balanceOf(msg.sender) > _amount, "Not enough tokens in the wallet");
        require(parsedTokenContract.allowance(msg.sender, address(this)) > 0, "Allowance is less than deposit amount");

        userToTokenMapping[msg.sender][_tokenContract].balances += _amount;
        userToTokenMapping[msg.sender][_tokenContract].locktime = block.timestamp + 5 minutes;

        parsedTokenContract.transferFrom(msg.sender, address(this), _amount);

        emit depositTokenEvent(_tokenContract, msg.sender, _amount, userToTokenMapping[msg.sender][_tokenContract].balances, etherBalances[msg.sender].locktime);
    }

    function withdrawEther(uint _withdrawAmount) public {
        require(_withdrawAmount > 0, "Withdraw amount should be greater than zero");
        require(etherBalances[msg.sender].balances >= _withdrawAmount, "the balance is less than the withdraw request");
        require(block.timestamp >= etherBalances[msg.sender].locktime, "tokens are locked");

        etherBalances[msg.sender].balances -= _withdrawAmount;

        // send the ether back to the sender
        payable(msg.sender).transfer(_withdrawAmount);

        emit withdrawEtherEvent(msg.sender, _withdrawAmount, etherBalances[msg.sender].balances);
    }

    function withdrawToken(address _tokenContract, uint _withdrawAmount) public {
        require(_withdrawAmount > 0, "Withdraw amount should be greater than zero");
        require(userToTokenMapping[msg.sender][_tokenContract].balances >= _withdrawAmount, "the balance is less than the withdraw request");
        require(block.timestamp >= userToTokenMapping[msg.sender][_tokenContract].locktime, "tokens are locked");

        ERC20 parsedTokenContract = ERC20(_tokenContract);

        userToTokenMapping[msg.sender][_tokenContract].balances -= _withdrawAmount;

        //Transfer the amounts
        parsedTokenContract.transfer(msg.sender, _withdrawAmount);

        emit withdrawTokenEvent(_tokenContract, msg.sender, _withdrawAmount, userToTokenMapping[msg.sender][_tokenContract].balances);
    }
}