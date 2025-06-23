# Upgradeable ERC20 Example

This project demonstrates upgrading a token proxy using Hardhat and OpenZeppelin.

## Deployment steps

1. Deploy the initial implementation and proxy:

```bash
npx hardhat run scripts/deploy-v1.js --network <network>
```

2. Interact with the proxy (mint and transfer) using the deployed address.

3. Deploy the new implementation and upgrade the proxy:

```bash
PROXY_ADDRESS=<deployed proxy address> npx hardhat run scripts/upgrade-v2.js --network <network>
```

The test `token-upgrade.js` shows the full workflow and prints logs of balances
before and after the upgrade.
