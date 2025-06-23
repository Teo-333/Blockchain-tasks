const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GameCharacterCollection", function () {
  let chars, owner, other;
  beforeEach(async function () {
    [owner, other] = await ethers.getSigners();
    const Chars = await ethers.getContractFactory("GameCharacterCollection");
    chars = await Chars.deploy("ipfs://examplechars/");
  });

  it("mints full set within gas limit", async function () {
    const tx = await chars.mintFullSet();
    const receipt = await tx.wait();
    expect(receipt.gasUsed.toNumber()).to.be.below(200000);
    for (let i = 1; i <= 10; i++) {
      expect(await chars.balanceOf(owner.address, i)).to.equal(1);
    }
  });

  it("can gift characters", async function () {
    await chars.mintFullSet();
    await chars.gift(other.address, [1, 2], [1, 1]);
    expect(await chars.balanceOf(other.address, 1)).to.equal(1);
    expect(await chars.balanceOf(other.address, 2)).to.equal(1);
  });
});
