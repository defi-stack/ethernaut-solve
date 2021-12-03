import { use, expect } from 'chai';
import { ethers, waffle } from 'hardhat';
import { CoinFlip, CoinFlipHack } from '../dist/types';

use(waffle.solidity);

describe('CoinFlip', () => {
  let contract: CoinFlip;
  let hack: CoinFlipHack;

  before(async () => {
    contract = await (await ethers.getContractFactory('CoinFlip')).deploy() as CoinFlip;
    await contract.deployed();

    hack = await (await ethers.getContractFactory('CoinFlipHack'))
      .deploy(contract.address) as CoinFlipHack;
    await hack.deployed();
  });

  it('flip 10 times', async () => {
    for (let i = 0; i < 10; i++) {
      await (await hack.hackFlip()).wait();
    }
    expect(await contract.consecutiveWins()).to.eq(10);
  });
});
