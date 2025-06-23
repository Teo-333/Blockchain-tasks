// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";

/// @title MyProxy - simple transparent upgradeable proxy
/// @notice This contract exposes OpenZeppelin's TransparentUpgradeableProxy for deployment
contract MyProxy is TransparentUpgradeableProxy {
    constructor(address logic, address admin, bytes memory data)
        TransparentUpgradeableProxy(logic, admin, data)
    {}
}
