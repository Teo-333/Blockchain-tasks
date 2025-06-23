# Student Visit Card & Game Characters

This repo contains two Solidity contracts and Hardhat scripts to deploy them on the Sepolia testnet.

## Environment Setup

1. Install [Node.js](https://nodejs.org/) (version 16 or higher).
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in:
   - `PRIVATE_KEY` – deployer wallet private key
   - `SEPOLIA_RPC` – RPC URL to Sepolia (Infura/Alchemy etc.)
   - `STUDENT_WALLET` – student address to receive NFTs
   - `VISIT_BASE_CID` – base CID for the visit card metadata
   - `CHARACTER_BASE_CID` – base CID for the character metadata

## IPFS Pinning

Images and metadata are pinned with [nft.storage](https://nft.storage). Example upload:

```bash
npm i -g nft.storage
export NFT_STORAGE_KEY=YOUR_KEY
nft.storage upload --name visit.png ./visit.png
```

Record the directory CIDs for:

- Visit card assets → `bafyvisitcid`
- Game characters assets → `bafycharcid`

These CIDs become the base URI for each contract (e.g. `ipfs://bafyvisitcid/`).

## Compile & Test

```bash
npx hardhat compile
npx hardhat test
```

## Deploy & Mint

Deploy to Sepolia:

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

The script deploys both contracts, mints one card to `STUDENT_WALLET`, mints a full set of characters to the deployer, then gifts characters 1 & 2 to the student. Example console output:

```
StudentVisitCard deployed: 0x...1
GameCharacterCollection deployed: 0x...2
Minted visit card to student: 0x...tx1
Minted full character set: 0x...tx2
Gifted characters 1 & 2 to student: 0x...tx3
```

These transaction hashes can be viewed on [Etherscan](https://sepolia.etherscan.io/) and the NFTs are visible on OpenSea testnet once minted.

## Etherscan Verification (optional)

After deployment you can verify the contracts with:

```bash
npx hardhat verify --network sepolia DEPLOYED_ADDRESS "ipfs://BASE_CID/"
```

## Notes

This repository does not include the actual images/JSON. Use your own assets and pin them to IPFS to obtain the two CIDs referenced above.
