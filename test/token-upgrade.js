const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("MyToken proxy upgrade", function () {
  it("preserves balances and exposes new version", async function () {
    const [owner, other] = await ethers.getSigners();

    const V1 = await ethers.getContractFactory("MyTokenV1");
    const proxy = await upgrades.deployProxy(V1, ["MyToken", "MTK"], {
      initializer: "initialize",
    });
    await proxy.waitForDeployment();

    console.log("Proxy deployed at", await proxy.getAddress());

    await proxy.mint(owner.address, 100);
    await proxy.transfer(other.address, 40);
    console.log("Balances after transfer:", {
      owner: await proxy.balanceOf(owner.address),
      other: await proxy.balanceOf(other.address),
    });

    const V2 = await ethers.getContractFactory("MyTokenV2");
    const proxyV2 = await upgrades.upgradeProxy(await proxy.getAddress(), V2);
    await proxyV2.waitForDeployment();
    console.log("Upgraded to V2 at", await proxyV2.getAddress());

    expect(await proxyV2.version()).to.equal("V2");
    const ownerBal = await proxyV2.balanceOf(owner.address);
    const otherBal = await proxyV2.balanceOf(other.address);
    console.log("Balances after upgrade:", { owner: ownerBal, other: otherBal });

    expect(ownerBal).to.equal(60);
    expect(otherBal).to.equal(40);
  });
});
