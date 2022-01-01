import hre from 'hardhat';
import { Approver, NaughtCoin } from '../dist/types';

(async () => {
  const [deployer] = await hre.ethers.getSigners();
  const { address } = await hre.deployments.get('Approver');

  const token = await hre.ethers.getContractAt('NaughtCoin', `${process.env.INSTANCE_15}`) as NaughtCoin;
  const approver = await hre.ethers.getContractAt('Approver', address) as Approver;

  const approveTx = await token.approve(
    approver.address,
    (await token.balanceOf(deployer.address)),
  );
  await approveTx.wait();

  const moveTx = await approver.moveAll();
  await moveTx.wait();
})();
