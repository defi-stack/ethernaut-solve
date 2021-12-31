import { use, expect } from 'chai';
import { ethers, waffle } from 'hardhat';
import { Vault } from '../dist/types';

use(waffle.solidity);

describe('Simple', () => {
  let vault: Vault;

  before(async () => {
    vault = await (await ethers.getContractFactory('Vault'))
      .deploy(ethers.utils.solidityKeccak256(['string'], ['Hello World'])) as Vault;
  });

  it('unlock', async () => {
    const password = await ethers.provider.send(
      'eth_getStorageAt',
      [vault.address, '0x1', 'latest'],
    );

    await vault.unlock(password);
    expect(await vault.locked()).to.eq(false);
  });
});
