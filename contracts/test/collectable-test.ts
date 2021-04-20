import { expect } from "chai";
import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";

import { Collectable } from "../typechain/Collectable";
import { Marketplace } from "../typechain/Marketplace";

describe("Collectable", function () {
  it("CollectableContract mint 1", async () => {
    
    const CollectableContract = await ethers.getContractFactory("Collectable");
    const collectableInstance = (await CollectableContract.deploy("", "")) as Collectable;
    const [signer] = await ethers.getSigners();
    const signerAddress = await signer.getAddress();

    expect(await collectableInstance.uri(1)).to.equal("");

    const mintr = await collectableInstance.mint("https://ipfs.io/ipfs/9ajfw9jf9jawf9j", 1);

    const simple = await collectableInstance.uri(1);
    expect(simple).to.equal("https://ipfs.io/ipfs/9ajfw9jf9jawf9j/1.json");

    const balance = await collectableInstance.balanceOf(signerAddress, 1);
    expect(balance).to.equal(1);

  });

  it("CollectableContract mint multiple", async () => {
    const CollectableContract = await ethers.getContractFactory("Collectable");
    const collectableInstance = (await CollectableContract.deploy("", "")) as Collectable;
    const [signer] = await ethers.getSigners();
    const signerAddress = await signer.getAddress();

    expect(await collectableInstance.uri(1)).to.equal("");

    await collectableInstance.mintBatch(
      25,
      "https://ipfs.io/ipfs/9ajfw9jf9jawf9j",
      1
    );
    const balance = await collectableInstance.balanceOf(signerAddress, 1);
    expect(balance).to.equal(1);

    const simple = await collectableInstance.uri(1);
    expect(simple).to.equal("https://ipfs.io/ipfs/9ajfw9jf9jawf9j/1.json");

    const simple25 = await collectableInstance.uri(25);
    expect(simple25).to.equal("https://ipfs.io/ipfs/9ajfw9jf9jawf9j/25.json");
  });

  it("CollectableContract mint editions", async () => {
    const CollectableContract = await ethers.getContractFactory("Collectable");
    const collectableInstance = (await CollectableContract.deploy("", "")) as Collectable;
    const [signer] = await ethers.getSigners();
    const signerAddress = await signer.getAddress();

    expect(await collectableInstance.uri(1)).to.equal("");

    await collectableInstance.mintBatch(
      25,
      "https://ipfs.io/ipfs/9ajfw9jf9jawf9j",
      20
    );
    const balance = await collectableInstance.balanceOf(signerAddress, 1);
    expect(balance).to.equal(20);

    const simple = await collectableInstance.uri(1);
    expect(simple).to.equal("https://ipfs.io/ipfs/9ajfw9jf9jawf9j/1.json");

    const simple25 = await collectableInstance.uri(25);
    expect(simple25).to.equal("https://ipfs.io/ipfs/9ajfw9jf9jawf9j/25.json");
    expect(await collectableInstance.balanceOf(signerAddress, 25)).to.equal(20);
  });

  it("CollectableContract mint multiple 2", async () => {
    const CollectableContract = await ethers.getContractFactory("Collectable");
    const collectableInstance = (await CollectableContract.deploy("", "")) as Collectable;
    const [signer] = await ethers.getSigners();
    const signerAddress = await signer.getAddress();

    expect(await collectableInstance.uri(1)).to.equal("");

    await collectableInstance.mintBatch(
      25,
      "https://ipfs.io/ipfs/7B502C3A1F48C8609AE212CDFB639DEE39673F5E",
      1
    );
    await collectableInstance.mintBatch(
      20,
      "https://ipfs.io/ipfs/2B502C3A1F48C8609BE212CDFB639DEE39673F5E",
      1
    );
    const balance = await collectableInstance.balanceOf(signerAddress, 1);
    expect(balance).to.equal(1);
    const balance2 = await collectableInstance.balanceOf(signerAddress, 45);
    expect(balance2).to.equal(1);

    const simple = await collectableInstance.uri(1);
    expect(simple).to.equal(
      "https://ipfs.io/ipfs/7B502C3A1F48C8609AE212CDFB639DEE39673F5E/1.json"
    );

    // #30 is 5th in series
    const simple30 = await collectableInstance.uri(30);
    expect(simple30).to.equal(
      "https://ipfs.io/ipfs/2B502C3A1F48C8609BE212CDFB639DEE39673F5E/5.json"
    );
  });

  it("CollectableContract purchase", async () => {
    const CollectableContract = await ethers.getContractFactory("Collectable");
    const collectableInstance = (await CollectableContract.deploy("", "")) as Collectable;
    const MarketplaceContract = await ethers.getContractFactory("Marketplace");
    const marketplaceInstance = (await MarketplaceContract.deploy(
      collectableInstance.address
    )) as Marketplace;
    const [signer, signer2] = await ethers.getSigners();
    const signerAddress = await signer.getAddress();

    // set approval to marketplace contract
    await collectableInstance.setApprovalForAll(
      marketplaceInstance.address,
      true
    );

    expect(await collectableInstance.uri(1)).to.equal("");

    await collectableInstance.mint(
      "https://ipfs.io/ipfs/7B502C3A1F48C8609AE212CDFB639DEE39673F5E",
      2
    );
    const balance = await collectableInstance.balanceOf(signerAddress, 1);
    expect(balance).to.equal(2);

    const simple = await collectableInstance.uri(1);
    expect(simple).to.equal(
      "https://ipfs.io/ipfs/7B502C3A1F48C8609AE212CDFB639DEE39673F5E/1.json"
    );

    await expect(
      marketplaceInstance.connect(signer2).purchase(2, 1)
    ).to.be.revertedWith("Not for sale");

    await marketplaceInstance.setPrice(1, ethers.utils.parseEther("0.2"));

    const originalBalance = await signer.getBalance();

    await expect(
      marketplaceInstance.connect(signer2).purchase(1, 1, {
        value: ethers.utils.parseEther("0.2"),
      })
    )
      .to.emit(collectableInstance, "TransferSingle")
      .withArgs(
        marketplaceInstance.address,
        signerAddress,
        await signer2.getAddress(),
        1,
        1
      );
    expect(
      await collectableInstance.balanceOf(await signer2.getAddress(), 1)
    ).to.equal(1);
    expect(await signer.getBalance()).to.equal(
      originalBalance.add(ethers.utils.parseEther("0.2"))
    );
  });
});
