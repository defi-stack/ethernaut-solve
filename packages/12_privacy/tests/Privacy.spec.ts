import { use, expect } from 'chai';
import { ethers, waffle } from 'hardhat';
import { Privacy } from '../dist/types';

use(waffle.solidity);

describe('Privacy', () => {
  let privacy: Privacy;

  before(async () => {
    privacy = await (await ethers.getContractFactory('Privacy'))
      .deploy([
        ethers.utils.solidityKeccak256(['string'], ['Hello World']),
        ethers.utils.solidityKeccak256(['string'], ['Alice']),
        ethers.utils.solidityKeccak256(['string'], ['Bob']),
      ]) as Privacy;
  });

  it('unlock', async () => {
    const data = await ethers.provider.send(
      'eth_getStorageAt',
      [privacy.address, '0x5', 'latest'],
    );

    const mask = ethers.BigNumber
      .from(ethers.constants.MaxUint256)
      .shr(128)
      .shl(128);

    const password = ethers.BigNumber.from(data)
      .and(mask)
      .shr(128);

    await privacy.unlock(password.toHexString());
    expect(await privacy.locked()).eq(false);
  });
});
