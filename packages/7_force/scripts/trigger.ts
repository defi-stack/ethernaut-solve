import hre from 'hardhat';
import { Hacker } from '../dist/types';

(async () => {
  const { address } = await hre.deployments.get('Hacker');

  const hacker = await hre.ethers.getContractAt('Hacker', address) as Hacker;
  const tx = await hacker.hack({ value: hre.ethers.utils.parseUnits('10', 0) })
  await tx.wait();
})();
