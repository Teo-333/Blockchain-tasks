require('dotenv').config();
const hre = require('hardhat');

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log('Deploying with', deployer.address);
  const student = process.env.STUDENT_WALLET;
  const visitCid = process.env.VISIT_BASE_CID;
  const charCid = process.env.CHARACTER_BASE_CID;

  const Visit = await hre.ethers.getContractFactory('StudentVisitCard');
  const visit = await Visit.deploy(`ipfs://${visitCid}/`);
  await visit.deployed();
  console.log('StudentVisitCard deployed:', visit.address);

  const Characters = await hre.ethers.getContractFactory('GameCharacterCollection');
  const chars = await Characters.deploy(`ipfs://${charCid}/`);
  await chars.deployed();
  console.log('GameCharacterCollection deployed:', chars.address);

  const tx1 = await visit.mint(student, 1);
  await tx1.wait();
  console.log('Minted visit card to student:', tx1.hash);

  const tx2 = await chars.mintFullSet();
  await tx2.wait();
  console.log('Minted full character set:', tx2.hash);

  const tx3 = await chars.gift(student, [1, 2], [1, 1]);
  await tx3.wait();
  console.log('Gifted characters 1 & 2 to student:', tx3.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
