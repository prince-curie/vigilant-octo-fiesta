import { expect } from "chai";
import { ethers } from "hardhat";

describe("TEST ATLANTIS CONTRACT UPLOAD COUNTER", function () {
  let fileManager: any;

  beforeEach(async function () {
    const AtlantisFileManager = await ethers.getContractFactory("AtlantisFileManager");
    
    fileManager = await AtlantisFileManager.deploy();
    await fileManager.deployed();
  });

  it("Counter should be equal 0 on deployment of contract", async function () {
    expect(await fileManager._tokenIdCounter()).to.equal(0);
  });

  it("Counter should be equal 2 after uploading file twice of contract", async function () {
    await Promise.all([
        fileManager.uploadFile(
            "File 1",
            "https://ipfs.io/ipfs/Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu",
            "Description for File 1 goes here ..."
        ),

        fileManager.uploadFile(
            "File 2",
            "https://ipfs.io/ipfs/Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiv",
            "Description for File 2 goes here ..."
        )
    ]);
    
    expect(fileManager._tokenIdCounter()).to.equal(2);
  });

});