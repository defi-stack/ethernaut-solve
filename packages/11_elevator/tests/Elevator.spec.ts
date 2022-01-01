import { use, expect } from 'chai';
import { ethers, waffle } from 'hardhat';
import { Elevator, Hacker } from '../dist/types';

use(waffle.solidity);

describe('Simple', () => {
  let elevator: Elevator;
  let hacker: Hacker;

  before(async () => {
    elevator = await (await ethers.getContractFactory('Elevator')).deploy() as Elevator;
    await elevator.deployed();

    hacker = await (await ethers.getContractFactory('Hacker'))
      .deploy(elevator.address) as Hacker;
    await hacker.deployed();
  });

  it('interaction', async () => {
    await hacker.attack();
    expect(await elevator.top()).eq(true);
  });
});
