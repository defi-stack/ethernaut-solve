import { expect, use } from 'chai';
import { ethers, waffle } from 'hardhat';
import { Fallout } from '../dist/types';

use(waffle.solidity);

describe('Fallback', () => {
  let fallout: Fallout;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    fallout = await (await ethers.getContractFactory('Fallout'))
      .connect(deployer)
      .deploy() as Fallout;
  });

  it('hack by interaction', async () => {
    const hacker = (await ethers.getSigners())[19];
    await fallout.connect(hacker).Fal1out();

    // expect
    expect(await fallout.owner()).to.eq(hacker.address);
  });
});
