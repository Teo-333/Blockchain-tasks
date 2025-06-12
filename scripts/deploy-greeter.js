async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying with:", deployer.address);
  
    const Greeter = await ethers.getContractFactory("Greeter");
  
    const greeter = await Greeter.deploy("Alice");
  
    await greeter.waitForDeployment();
  
    console.log("Greeter deployed to:", greeter.target);
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  