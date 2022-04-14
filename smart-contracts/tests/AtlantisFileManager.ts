import { expect } from "chai";
import { Signer } from "ethers";
import { ethers } from "hardhat";

describe("Atlantis File Manager", function () {
  let accounts: Signer[];
  let contract: any;

  beforeEach(async function () {
    accounts = await ethers.getSigners();
    const Contract = await ethers.getContractFactory('AtlantisFileManager');
    contract = await Contract.deploy()
  });

  it("Upload File Successfully", async function () {
    let name = 'gfhfdgfyd';
    let url = 'hfdieue';
    let description = 'uyhfhcjuur';

    const count = await contract._tokenIdCounter();

    await contract.uploadFile(name, url, description);
    
    const file = await contract.getFileData(count)
    
    expect(file['_name']).to.be.equal(name)
    expect(file['_url']).to.be.equal(url)
    expect(file['_description']).to.be.equal(description)
  });

  it("Makes a file private", async function () {
    let name = 'gfhfdgfyd';
    let url = 'hfdieue';
    let description = 'uyhfhcjuur';

    const count = await contract._tokenIdCounter();
    
    await contract.uploadFile(name, url, description);
    
    await contract.makeFilePrivate(count);

    const file = await contract.getFileData(count)
    
    expect(file['_name']).to.be.equal(name)
    expect(file['_url']).to.be.equal(url)
    expect(file['_access_level']).to.be.equal('private')
  });
});
