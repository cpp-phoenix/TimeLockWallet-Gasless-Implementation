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

    function depositEther() external payable {

        require(msg.value > 0, "Deposit amount should be greater than zero");

        //update user balances
        etherBalances[msg.sender].balances += msg.value;

        etherBalances[msg.sender].locktime = block.timestamp + 5 minutes;
    }

    function depsitToken(address _tokenContract, uint _amount) external {
        ERC20 parsedTokenContract = ERC20(_tokenContract);

        require(_amount > 0, "Deposit amount should be greater than zero");
        require(parsedTokenContract.allowance(msg.sender, address(this)) > 0, "Allowance is less than deposit amount");

        userToTokenMapping[msg.sender][_tokenContract].balances += _amount;
        userToTokenMapping[msg.sender][_tokenContract].locktime = block.timestamp + 5 minutes;

        parsedTokenContract.transferFrom(msg.sender, address(this), _amount);
    }

    function withdrawEther(uint _withdrawAmount) external {
        require(etherBalances[msg.sender].balances >= _withdrawAmount, "the balance is less than the withdraw request");
        require(block.timestamp >= etherBalances[msg.sender].locktime, "tokens are locked");

        etherBalances[msg.sender].balances -= _withdrawAmount;

        // send the ether back to the sender
        (bool sent, ) = msg.sender.call{value: _withdrawAmount}("");
        require(sent, "Withdraw failed");
    }

    function withdrawToken(address _tokenContract, uint _withdrawAmount) external {
        ERC20 parsedTokenContract = ERC20(_tokenContract);

        require(userToTokenMapping[msg.sender][_tokenContract].balances >= _withdrawAmount, "the balance is less than the withdraw request");
        require(block.timestamp >= userToTokenMapping[msg.sender][_tokenContract].locktime, "tokens are locked");

        userToTokenMapping[msg.sender][_tokenContract].balances -= _withdrawAmount;

        //Transfer the amounts
        parsedTokenContract.transfer(msg.sender, _withdrawAmount);

    }
}