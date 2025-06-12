// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Greeter {
 string private greeting;

 /// @notice Sets the initial greeting
 /// @param _greeting The greeting message
 constructor(string memory _greeting) {
     greeting = _greeting;
 }

 /// @notice Returns the stored greeting
 /// @return The greeting message with the name
 function greet() external view returns (string memory) {
     return greeting;
 }
}