# Student Visit Card & Game Characters

This repo contains two Solidity contracts and Hardhat scripts to deploy them on the Sepolia testnet.

## Environment Setup

1. Install [Node.js](https://nodejs.org/) (version 16 or higher).
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in:
   - `PRIVATE_KEY` – private key of the account that will deploy the contracts. In MetaMask you can export this from the account settings.
   - `SEPOLIA_RPC` – Sepolia RPC URL from a provider such as [Infura](https://infura.io/) or [Alchemy](https://alchemy.com/).
   - `STUDENT_WALLET` – Ethereum address of the student receiving the NFTs.
   - `VISIT_BASE_CID` – IPFS CID for the folder holding the visit card metadata.
   - `CHARACTER_BASE_CID` – IPFS CID for the folder holding the character metadata.

## IPFS Pinning

Images and JSON metadata should be uploaded to IPFS. A convenient option is
[nft.storage](https://nft.storage). Install the CLI and upload a directory
containing your files:

```bash
npm i -g nft.storage
export NFT_STORAGE_KEY=YOUR_KEY
nft.storage upload --name visit-directory ./visit_assets
```

The command prints a directory CID. Record two of them:

- Visit card directory → `bafyvisitcid`
- Game characters directory → `bafycharcid`

Inside each directory place the images and `id.json` files (e.g. `1.json`,
`2.json`). The contracts will call `tokenURI` which resolves to
`ipfs://bafyvisitcid/1.json`.

Set these CIDs as `VISIT_BASE_CID` and `CHARACTER_BASE_CID` in your `.env` file.

## Compile & Test

```bash
npx hardhat compile
npx hardhat test
```

## All-in-one Script

To compile, test and deploy in a single step run:

```bash
npm run all
```

This executes `scripts/run_all.sh` which in turn performs compilation, runs the
unit tests and then deploys the contracts to Sepolia.

## Deploy & Mint

Deploy to Sepolia with the predefined npm script:

```bash
npm run deploy
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
