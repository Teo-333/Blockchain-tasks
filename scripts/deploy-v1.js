const { ethers, upgrades } = require("hardhat");

async function main() {
  const MyTokenV1 = await ethers.getContractFactory("MyTokenV1");

  const proxy = await upgrades.deployProxy(MyTokenV1, ["MyToken", "MTK"], {
    initializer: "initialize",
  });
  await proxy.waitForDeployment();

  console.log("Proxy deployed at:", await proxy.getAddress());
}
main().catch(console.error);
