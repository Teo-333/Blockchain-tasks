// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./MyTokenV1.sol";

/// @title MyTokenV2 - adds version() to MyTokenV1
contract MyTokenV2 is MyTokenV1 {
    /// @notice Returns the contract version
    function version() public pure returns (string memory) {
        return "V2";
    }
}
