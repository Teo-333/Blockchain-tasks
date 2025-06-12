const { expect } = require("chai");

describe("Greeter contract", function () {
  let Greeter, greeter;
  const greeting = "Alice";

  beforeEach(async function () {
    Greeter = await ethers.getContractFactory("Greeter");
    greeter = await Greeter.deploy(greeting);
    await greeter.waitForDeployment();
  });

  it("should return the greeting provided in the constructor", async function () {
    expect(await greeter.greet()).to.equal(greeting);
  });
});
