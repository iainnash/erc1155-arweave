// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import "@nomiclabs/hardhat-ethers";
import hre from "hardhat";

import { FBoys } from "../typechain/FBoys";
import { FBoysSimple } from "../typechain/FBoysSimple";
import { FBoysMarketplace } from "../typechain/FBoysMarketplace";


async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile 
  // manually to make sure everything is compiled
  // await hre.run('compile');
  const ADDRESS_MARKETPLACE = '';
  const ADDRESS_NFT = '';

  // We get the contract to deploy
  const FBoysSimple = await hre.ethers.getContractFactory("FBoySimple");
  const FBoysMarketplace = await hre.ethers.getContractFactory("FBoySimpleMarketplace");
  const fBoysSimpleInstance = (await FBoysSimple.attach(ADDRESS_NFT)) as FBoysSimple;
  const fBoysMarketplaceInstance = (await FBoysMarketplace.attach(ADDRESS_MARKETPLACE)) as FBoysMarketplace;
  await fBoysMarketplaceInstance.deployed();
  
  fBoysSimpleInstance.setApprovalForAll(fBoysMarketplaceInstance.address, true);

  console.log("FBoysSimple deployed to:", fBoysSimpleInstance.address);
  console.log("Marketplace deployed to:", fBoysMarketplaceInstance.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
