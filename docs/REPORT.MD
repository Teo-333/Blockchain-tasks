# MultiSig Wallet Report

## ✅ Design Overview

This wallet requires M-of-N owner confirmations before executing transactions. It implements:
- ETH transfer via `submitTransaction`
- Owner-based access control
- Revoking and confirming transactions

## 💡 Features
- Only owners can submit, confirm, execute, and revoke
- Multi-confirmation logic
- Events for off-chain tracking

## 🔐 Security
- Prevents re-entrancy via Checks-Effects-Interactions
- Owners must be unique and non-zero
- Prevents duplicate confirmations
- Can’t execute unless threshold is met

## 🧪 Test Instructions
Run tests with:
```bash
npx hardhat test
