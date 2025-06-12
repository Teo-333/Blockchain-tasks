const { ethers } = require("hardhat");

async function main() {
    // Define unlock time (1 year from now)
    const unlockTime = Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60);
    
    // Define the amount to lock (0.01 ETH in wei)
    const lockedAmount = ethers.parseEther("0.01");
    
    const Lock = await ethers.getContractFactory("Lock");
    const lock = await Lock.deploy(unlockTime, { value: lockedAmount });
    await lock.waitForDeployment();
    
    console.log("Lock deployed to:", await lock.getAddress());
    console.log("Unlock time:", new Date(unlockTime * 1000));
    console.log("Locked amount:", ethers.formatEther(lockedAmount), "ETH");
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  