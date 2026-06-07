import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying ContentPassport with:", deployer.address);
  console.log("Balance:", ethers.formatEther(await deployer.provider.getBalance(deployer.address)), "ETH");

  const ContentPassport = await ethers.getContractFactory("ContentPassport");
  const contract = await ContentPassport.deploy();
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("\n✅ ContentPassport deployed to:", address);
  console.log("👉 Add to backend/.env: CONTRACT_ADDRESS=" + address);
  console.log("👉 Add to frontend/.env.local: NEXT_PUBLIC_CONTRACT_ADDRESS=" + address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
