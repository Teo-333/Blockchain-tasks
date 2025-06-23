# Upgradeable ERC20 Example

This project demonstrates upgrading a token proxy using Hardhat and OpenZeppelin.

## Deployment on Sepolia

1. Copy `.env.example` to `.env` and fill in your Sepolia RPC URL and the
   private key of the deploying account:

```bash
cp .env.example .env
```

2. Deploy the initial implementation behind a proxy:

```bash
npx hardhat run scripts/deploy-v1.js --network sepolia
```

3. Interact with the proxy contract (mint and transfer tokens) using the
   deployed address.

4. Deploy the new implementation and upgrade the proxy:

```bash
PROXY_ADDRESS=<deployed proxy address> npx hardhat run scripts/upgrade-v2.js --network sepolia
```

The test `token-upgrade.js` shows the full workflow and prints logs of balances
before and after the upgrade.
