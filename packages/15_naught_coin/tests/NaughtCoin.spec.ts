import { use, expect } from 'chai';
import { ethers, waffle } from 'hardhat';
import { NaughtCoin, Approver } from '../dist/types';

use(waffle.solidity);

describe('Simple', () => {
  let token: NaughtCoin;
  let approver: Approver;

  before(async () => {
    const [deployer] = await ethers.getSigners();
    token = await (await ethers.getContractFactory('NaughtCoin'))
      .deploy(deployer.address) as NaughtCoin;
    await token.deployed();

    approver = await (await ethers.getContractFactory('Approver'))
      .deploy(token.address) as Approver;
    await approver.deployed();
  });

  it('interaction', async () => {
    const [deployer] = await ethers.getSigners();

    await token.approve(approver.address, (await token.balanceOf(deployer.address)));
    await approver.moveAll();
    expect(await token.balanceOf(deployer.address)).eq(0);
  });
});
