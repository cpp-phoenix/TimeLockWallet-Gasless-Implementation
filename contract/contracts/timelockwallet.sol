// SPDX-License-Identifier: MIT

pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@opengsn/contracts/src/ERC2771Recipient.sol";

contract TimelockWallet is ERC2771Recipient {

    using SafeMath for uint;

    uint private baseLockTime;

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

    constructor(address trustedForwarder, uint _baseLockTime) {
        _setTrustedForwarder(trustedForwarder);
        baseLockTime = _baseLockTime;
    }

    function versionRecipient() external pure returns (string memory) {
        return "1";
    }

    function depositEther() public payable {

        require(msg.value > 0, "Deposit amount should be greater than zero");

        //update user balances
        etherBalances[_msgSender()].balances += msg.value;

        etherBalances[_msgSender()].locktime = block.timestamp + baseLockTime;

        emit depositEtherEvent(_msgSender(), msg.value, etherBalances[_msgSender()].balances, etherBalances[_msgSender()].locktime);
    }

    function depsitToken(address _tokenContract, uint _amount) public {
        ERC20 parsedTokenContract = ERC20(_tokenContract);

        require(_amount > 0, "Deposit amount should be greater than zero");
        require(parsedTokenContract.balanceOf(_msgSender()) > _amount, "Not enough tokens in the wallet");
        require(parsedTokenContract.allowance(_msgSender(), address(this)) > 0, "Allowance is less than deposit amount");

        userToTokenMapping[_msgSender()][_tokenContract].balances += _amount;
        userToTokenMapping[_msgSender()][_tokenContract].locktime = block.timestamp + baseLockTime;

        parsedTokenContract.transferFrom(_msgSender(), address(this), _amount);

        emit depositTokenEvent(_tokenContract, _msgSender(), _amount, userToTokenMapping[_msgSender()][_tokenContract].balances, etherBalances[_msgSender()].locktime);
    }

    function withdrawEther(uint _withdrawAmount) public {
        require(_withdrawAmount > 0, "Withdraw amount should be greater than zero");
        require(etherBalances[_msgSender()].balances >= _withdrawAmount, "the balance is less than the withdraw request");
        require(block.timestamp >= etherBalances[_msgSender()].locktime, "tokens are locked");

        etherBalances[_msgSender()].balances -= _withdrawAmount;

        // send the ether back to the sender
        payable(_msgSender()).transfer(_withdrawAmount);

        emit withdrawEtherEvent(_msgSender(), _withdrawAmount, etherBalances[_msgSender()].balances);
    }

    function withdrawToken(address _tokenContract, uint _withdrawAmount) public {
        require(_withdrawAmount > 0, "Withdraw amount should be greater than zero");
        require(userToTokenMapping[_msgSender()][_tokenContract].balances >= _withdrawAmount, "the balance is less than the withdraw request");
        require(block.timestamp >= userToTokenMapping[_msgSender()][_tokenContract].locktime, "tokens are locked");

        ERC20 parsedTokenContract = ERC20(_tokenContract);

        userToTokenMapping[_msgSender()][_tokenContract].balances -= _withdrawAmount;

        //Transfer the amounts
        parsedTokenContract.transfer(_msgSender(), _withdrawAmount);

        emit withdrawTokenEvent(_tokenContract, _msgSender(), _withdrawAmount, userToTokenMapping[_msgSender()][_tokenContract].balances);
    }
}