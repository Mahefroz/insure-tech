// Importing necessary modules
const { expect } = require("chai");
const { ethers } = require("hardhat");

// Defining the test suite
describe("WellsNft", () => {
  let wellsNft;
  let owner;
  let addr1;
  let addr2;

  // Defining test cases
  beforeEach(async () => {
    const WellsNft = await ethers.getContractFactory("WellsNft");
    const [_owner, _addr1, _addr2] = await ethers.getSigners();
    owner = _owner;
    addr1 = _addr1;
    addr2 = _addr2;
    console.log("Signers", _owner.address);

    wellsNft = await WellsNft.deploy();
    await wellsNft.deployed();
    console.log("Deployed with address", wellsNft.address);
  });

  describe("Deployment", () => {
    it("Should set the correct name and symbol", async () => {
      expect(await wellsNft.name()).to.equal("WellsNft");
      expect(await wellsNft.symbol()).to.equal("WToken");
    });
  });

  describe("Minting", () => {
    it("Should mint tokens with unique URIs", async () => {
      await wellsNft.safeMint(addr1.address, "/uri1");
      await wellsNft.safeMint(addr2.address, "/uri2");

      const token1URI = await wellsNft.tokenURI(1);
      const token2URI = await wellsNft.tokenURI(2);

      expect(token1URI).to.equal("https://w3s.link/ipfs/uri1");
      expect(token2URI).to.equal("https://w3s.link/ipfs/uri2");
    });

    it("Should not allow minting beyond the token limit", async () => {
      const tokenLimit = 10;
      for (let i = 0; i < tokenLimit; i++) {
        await wellsNft.safeMint(owner.address, "uri" + i);
      }

      await expect(
        wellsNft.safeMint(owner.address, "uri11")
      ).to.be.revertedWith("Token limit reached");
    });

    it("Should not allow minting with an empty URI", async () => {
      await expect(wellsNft.safeMint(owner.address, "")).to.be.revertedWith(
        "URL cannot be empty"
      );
    });

    it("Should not allow minting with a duplicate URI", async () => {
      await wellsNft.safeMint(owner.address, "uri1");

      await expect(wellsNft.safeMint(owner.address, "uri1")).to.be.revertedWith(
        "Token already exists"
      );
    });
  });

  describe("Pausing", () => {
    it("Should pause and unpause the contract", async () => {
      await wellsNft.pause();
      expect(await wellsNft.paused()).to.equal(true);

      await wellsNft.unpause();
      expect(await wellsNft.paused()).to.equal(false);
    });

    it("Should not allow token transfers while paused", async () => {
      console.log("Addr1", addr1.address);
      await wellsNft.safeMint(addr1.address, "uri1");
      await wellsNft.pause();

      await expect(
        wellsNft.safeTransferFrom(addr1.address, addr2.address, 1)
      ).to.be.revertedWith("ERC721Pausable: token transfer while paused");
    });
  });
});
