import Safe, { SafeFactory, SafeAccountConfig } from '@gnosis.pm/safe-core-sdk';
import {
  SafeTransaction,
  SafeTransactionDataPartial,
} from '@gnosis.pm/safe-core-sdk-types';
import { ethers, providers } from 'ethers';
import EthersAdapter from '@gnosis.pm/safe-ethers-lib';
import { getEthersAdapter } from './get-ethers-adapter';

type TxParams = {
  to: string;
  value: string;
  data: string;
};

export const createSafe = async () => {
  const ethAdapter = await getEthersAdapter();
  const safeFactory = await SafeFactory.create({ ethAdapter });
  const signerOwner = await ethAdapter.getSigner().getAddress();
  const owners = [signerOwner];
  const threshold = 1;
  const safeAccountConfig: SafeAccountConfig = {
    owners,
    threshold,
  };

  const safeSdk: Safe = await safeFactory.deploySafe({ safeAccountConfig });
  console.log(safeSdk);
  const newSafeAddress = safeSdk.getAddress();
  console.log(newSafeAddress);
  return newSafeAddress;
};

export const initiateTx = async (safeAddress: string, txParams: TxParams) => {
  const ethAdapter = await getEthersAdapter();
  const safeSdk: Safe = await Safe.create({ ethAdapter, safeAddress });

  const safeTransactionData: SafeTransactionDataPartial = {
    to: txParams.to,
    value: txParams.value,
    data: txParams.data,
  };

  const safeTransaction = await safeSdk.createTransaction({
    safeTransactionData,
  });
  const txHash = await safeSdk.getTransactionHash(safeTransaction);
  const approveTxResponse = await safeSdk.approveTransactionHash(txHash);
  await approveTxResponse.transactionResponse?.wait();
  console.log(safeTransaction);
  return safeTransaction;
};

/**
 * Executes signed tx
 *
 * @param {SafeTransaction} safeTransaction - safe tx to be executed
 * @param safeAddress
 */
export const executeTx = async (
  safeTransaction: SafeTransaction,
  safeAddress: string,
) => {
  const provider = new providers.JsonRpcProvider(
    `https://goerli.infura.io/v3/77490ac5e5714bd38faf467630943686`,
    5,
  );
  const privateKey = process.env.REACT_APP_PRIVATE_KEY || '';
  const safeIExecOwner = new ethers.Wallet(privateKey, provider);
  const ethAdapter = new EthersAdapter({
    ethers,
    signer: safeIExecOwner,
  });
  const safeSdk: Safe = await Safe.create({ ethAdapter, safeAddress });
  const executeTxResponse = await safeSdk.executeTransaction(safeTransaction);
  await executeTxResponse.transactionResponse?.wait();
};
