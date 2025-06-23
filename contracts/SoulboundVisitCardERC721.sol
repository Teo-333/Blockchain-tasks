// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title Non-transferable Student Visit Card
/// @notice Soulbound ERC-721 that cannot be transferred or approved
contract StudentVisitCard is ERC721, Ownable {
    string private _baseTokenURI;

    constructor(string memory baseURI) ERC721("StudentVisitCard", "SVC") {
        _baseTokenURI = baseURI;
    }

    /// @notice Mint a visit card to `to`
    /// @param to receiver address
    /// @param tokenId new token ID
    function mint(address to, uint256 tokenId) external onlyOwner {
        _mint(to, tokenId);
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override
    {
        require(from == address(0) || to == address(0), "Transfers disabled");
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function approve(address to, uint256 tokenId) public override {
        revert("Approvals disabled");
    }

    function setApprovalForAll(address operator, bool approved) public override {
        revert("Approvals disabled");
    }
}
