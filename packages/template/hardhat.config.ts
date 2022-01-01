import path from 'path';
import dotenv from 'dotenv';
import { HardhatUserConfig } from 'hardhat/config';

import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import 'hardhat-deploy';

dotenv.config({ path: path.resolve(__dirname, '../../.env')});

const config: HardhatUserConfig = {
  // default network
  defaultNetwork: 'hardhat',

  // network config
  networks: {
    hardhat: {
      throwOnCallFailures: true,
      throwOnTransactionFailures: true,
    },

    rinkeby: {
      url: 'https://rinkeby-light.eth.linkpool.io/',
      chainId: 4,
      accounts: [`${process.env.PRIVATE_KEY}`],
    }
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
      {
        version: '0.6.0',
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
    cache: path.resolve(__dirname, './dist/.cache'),
    artifacts: path.resolve(__dirname, 'dist/artifacts'),
    deploy: path.resolve(__dirname, 'deploy'),
    deployments: path.resolve(__dirname, 'deployments'),
  },

  // typechain
  typechain: {
    outDir: 'dist/types',
    target: 'ethers-v5',
  },

  // hardhat-deployment
  namedAccounts: {
    deployer: 0,
  },
};

export default config;
