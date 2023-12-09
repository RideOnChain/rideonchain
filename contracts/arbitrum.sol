// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CustomToken is ERC20, Ownable {
    address private driver;

    constructor(string memory name, string memory symbol, address _driver) ERC20(name, symbol) {
        driver = _driver;
    }

    function transferToDriver(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");

        // Transfer tokens from user to contract
        _transfer(msg.sender, address(this), amount);

        // Transfer tokens from contract to driver
        _transfer(address(this), driver, amount);
    }

    // Owner can change the driver address
    function setDriver(address newDriver) external onlyOwner {
        driver = newDriver;
    }
}
