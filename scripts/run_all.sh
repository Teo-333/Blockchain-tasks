#!/bin/bash
set -e
npx hardhat compile
npx hardhat test
npx hardhat run scripts/deploy.js --network sepolia
