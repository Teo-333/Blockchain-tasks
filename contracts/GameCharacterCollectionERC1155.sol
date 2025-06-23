// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title Batch mintable collection of game characters
/// @notice ERC-1155 token where the owner can mint a full set and gift characters
contract GameCharacterCollection is ERC1155, Ownable {
    constructor(string memory baseURI) ERC1155(baseURI) {}

    /// @notice Mint one of each ID (1-10) to the owner
    function mintFullSet() external onlyOwner {
        uint256[] memory ids = new uint256[](10);
        uint256[] memory amounts = new uint256[](10);
        for (uint256 i = 0; i < 10; i++) {
            ids[i] = i + 1;
            amounts[i] = 1;
        }
        _mintBatch(msg.sender, ids, amounts, "");
    }

    /// @notice Gift tokens to another address
    function gift(address to, uint256[] calldata ids, uint256[] calldata amounts) external onlyOwner {
        safeBatchTransferFrom(msg.sender, to, ids, amounts, "");
    }
}
