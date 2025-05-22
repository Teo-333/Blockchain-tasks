import { expect } from "chai";
import { ethers } from "hardhat";

describe("MultiSigWallet", function () {
  let wallet: any;
  let owners: string[];
  let required = 2;

  beforeEach(async () => {
    const [owner1, owner2, owner3] = await ethers.getSigners();
    owners = [owner1.address, owner2.address, owner3.address];

    const MultiSig = await ethers.getContractFactory("MultiSigWallet");
    wallet = await MultiSig.deploy(owners, required);
  });

  it("should deploy with correct owners and confirmations", async () => {
    for (let i = 0; i < owners.length; i++) {
      expect(await wallet.isOwner(owners[i])).to.be.true;
    }
    expect(await wallet.required()).to.equal(2);
  });

  it("should allow submitting and confirming a transaction", async () => {
    const [owner1, owner2] = await ethers.getSigners();
    await wallet.connect(owner1).submitTransaction(owner2.address, 0, "0x");
    await wallet.connect(owner1).confirmTransaction(0);
    await wallet.connect(owner2).confirmTransaction(0);
    await wallet.connect(owner1).executeTransaction(0);
    const tx = await wallet.getTransaction(0);
    expect(tx.executed).to.be.true;
  });

  it("should prevent double confirmation", async () => {
    const [owner1] = await ethers.getSigners();
    await wallet.connect(owner1).submitTransaction(owner1.address, 0, "0x");
    await wallet.connect(owner1).confirmTransaction(0);
    await expect(wallet.connect(owner1).confirmTransaction(0)).to.be.revertedWith("Tx already confirmed");
  });
});
