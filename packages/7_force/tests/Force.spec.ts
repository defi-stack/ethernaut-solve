import { use, expect } from 'chai';
import { Contract } from 'ethers';
import { ethers, waffle } from 'hardhat';
import { Hacker } from '../dist/types';

use(waffle.solidity);

describe('Simple', () => {
  let contract: Contract;
  let hacker: Hacker;

  before(async () => {
    contract = await (await ethers.getContractFactory('Force')).deploy();
    hacker = await (await ethers.getContractFactory('Hacker'))
      .deploy(contract.address) as Hacker;
  });

  it('hack', async () => {
    await hacker.hack({ value: ethers.utils.parseUnits('10', 0) })

    expect(await ethers.provider.getBalance(contract.address))
      .eq(10);
  });
});
