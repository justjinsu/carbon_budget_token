
import { ethers, upgrades } from "hardhat";

async function main() {
  const name = "CarbonBudgetToken";
  const symbol = "CBT";

  // Example: 1 token = 1 tCO2, using 18 decimals
  // Replace with your chosen initial supply (e.g., IGCC/GCB reference)
  const initialSupply = ethers.parseUnits("130000000000", 18); // 130 GtCO2

  const CBT = await ethers.getContractFactory("CarbonBudgetToken");
  const cbt = await upgrades.deployProxy(CBT, [name, symbol, initialSupply], { initializer: "initialize" });
  await cbt.waitForDeployment();
  console.log("CBT proxy deployed to:", await cbt.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
