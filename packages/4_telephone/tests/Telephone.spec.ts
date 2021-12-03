import { expect, use } from 'chai';
import { ethers, waffle } from 'hardhat';
import { Telephone, TelephoneHack } from '../dist/types';

use(waffle.solidity);

describe('Telephone', () => {
  let contract: Telephone;
  let hacker: TelephoneHack;

  before(async () => {
    contract = await (await ethers.getContractFactory('Telephone')).deploy() as Telephone;
    await contract.deployed();

    hacker = await (await ethers.getContractFactory('TelephoneHack'))
      .deploy(contract.address) as TelephoneHack;
    await hacker.deployed();
  });

  it('hack', async () => {
    const [adminAcc, hackerAcc] = await ethers.getSigners();
    expect(await contract.owner()).to.eq(adminAcc.address);

    await hacker.connect(hackerAcc).forward(hackerAcc.address);
    expect(await contract.owner()).to.eq(hackerAcc.address);
  });
});
