const { ethers, upgrades } = require("hardhat");

async function main() {
  const proxyAddress = process.env.PROXY_ADDRESS;
  if (!proxyAddress) {
    throw new Error("Set PROXY_ADDRESS env var with deployed proxy address");
  }

  const MyTokenV2 = await ethers.getContractFactory("MyTokenV2");
  const upgraded = await upgrades.upgradeProxy(proxyAddress, MyTokenV2);
  await upgraded.waitForDeployment();

  console.log("Proxy upgraded. Address:", await upgraded.getAddress());
}

main().catch(console.error);
