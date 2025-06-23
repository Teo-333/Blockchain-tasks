// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

/// @title MyTokenV1 — basic ERC-20 with minting
contract MyTokenV1 is Initializable, ERC20Upgradeable, OwnableUpgradeable {
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    /// @notice Initialize name, symbol, and owner. Replaces constructor.
    function initialize(string memory name, string memory symbol)
        public
        initializer
    {
        __ERC20_init(name, symbol);
        __Ownable_init(msg.sender);  
    }

    /// @notice Mint `amount` tokens to `to`, onlyOwner.
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}
