const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("StudentVisitCard", function () {
  let card, owner, other;
  beforeEach(async function () {
    [owner, other] = await ethers.getSigners();
    const Card = await ethers.getContractFactory("StudentVisitCard");
    card = await Card.deploy("ipfs://examplecardcid/");
    await card.mint(other.address, 1);
  });

  it("should revert on transfer", async function () {
    await expect(card.connect(other).transferFrom(other.address, owner.address, 1)).to.be.revertedWith("Transfers disabled");
  });

  it("should revert on approval", async function () {
    await expect(card.connect(other).approve(owner.address, 1)).to.be.revertedWith("Approvals disabled");
    await expect(card.connect(other).setApprovalForAll(owner.address, true)).to.be.revertedWith("Approvals disabled");
  });
});
