import path from 'path';
import dotenv from 'dotenv';
import { HardhatUserConfig } from 'hardhat/config';

import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const config: HardhatUserConfig = {
  // default network
  defaultNetwork: 'hardhat',

  // network config
  networks: {
    hardhat: {
      throwOnCallFailures: true,
      throwOnTransactionFailures: true,
    },
  },

  // solidity config
  solidity: {
    compilers: [
      {
        version: '0.8.0',
        settings: {
          optimizer: { enabled: true, runs: 200 },
          evmVersion: 'berlin',
        },
      },
    ],
  },

  // repository config
  paths: {
    sources: path.resolve(__dirname, 'contracts'),
    tests: path.resolve(__dirname, 'tests'),
    cache: path.resolve(__dirname, '../../.cache'),
    artifacts: path.resolve(__dirname, 'dist/artifacts'),
  },

  // typechain
  typechain: {
    outDir: 'dist/types',
    target: 'ethers-v5',
  },
};

export default config;
