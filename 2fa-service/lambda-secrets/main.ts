const AWS = require('aws-sdk');
import {ethers, providers} from 'ethers';
import totp from "totp-generator";
import { authenticator } from 'otplib';
import SafeServiceClient, {
  ProposeTransactionProps, SafeMultisigTransactionListResponse,
  SafeMultisigTransactionResponse
} from "@gnosis.pm/safe-service-client";
import Safe, {SafeFactory, SafeAccountConfig} from '@gnosis.pm/safe-core-sdk';
import EthersAdapter from '@gnosis.pm/safe-ethers-lib';


type AWSEvent = {
  info: {
    fieldName: string
  },
  arguments: {
    userId: string,
    totp: string,
    checkAndSign: boolean,
    safeTxHash?: string,
    safeAddress?: string,
  }
}

exports.handler = async (event: AWSEvent) => {
  switch (event.info.fieldName) {
    case "getSecretById":
      return await setup(event.arguments.userId);
    case "checkSecret":
      console.log('check sercret')
      return await checkAndSign(
        event.arguments.userId,
        event.arguments.totp,
        event.arguments.checkAndSign,
        event.arguments?.safeTxHash,
        event.arguments?.safeAddress,
      );
    default:
      return null;
  }
};

/**
 * *
 * @param userAddress
 */
async function setup(userAddress: string) {
  // check if the user doesn't exist

  // generate private & public key
  const randomMnemonic = ethers.Wallet.createRandom().mnemonic;
  const wallet = ethers.Wallet.fromMnemonic(randomMnemonic.phrase);
  const pubKey = wallet.publicKey;
  const privKey = wallet.privateKey;

  // generate a random secret
  // const secret = generateSecret(16);
  const secret = authenticator.generateSecret();

  const secretToSave = {
    userAddress,
    iExecKey: pubKey,
    iExecPrivateKey: privKey,
    secret,
  };

  // store to the database
  if (!process.env.SECRETS_TABLE) {
    return;
  }

  try {
    await writeToDb(process.env.SECRETS_TABLE || '', secretToSave);
    return {
      secret,
      iExecPubKey: pubKey // to add iExecPubKey as a 2nd owner
    };
  } catch (err) {
    console.log('DynamoDB error: ', err);
    return null;
  }

}

/**
 * *
 * @param length
 */
function generateSecret(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

/**
 *
 * @param tableName
 * @param data
 * @param cb
 */
async function writeToDb(tableName: string, data: { [x: string]: any }) {
  const dynamo = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: tableName,
    Item: data,
  };
  await dynamo
    .put(params)
    .promise();
}

/**
 * *
 * @param secret
 */
let generateLastTotps = (secret: string) => {
  let timestamp = Date.now()
  let totp_a = totp(secret, {timestamp: timestamp - 30, period: 30});
  let totp_d = totp(secret, {timestamp: timestamp - 60, period: 30});
  let totp_b = totp(secret, {timestamp: timestamp - 90, period: 30});
  let totp_c = totp(secret, {timestamp: timestamp - 120, period: 30});
  let totp_e = totp(secret, {timestamp: timestamp - 150, period: 30});
  return [totp_a, totp_b, totp_c, totp_d, totp_e]
}

/**
 * *
 * @param userAddress
 * @param userTotp
 * @param checkAndSign
 * @param safeTxHash
 * @param safeAddress
 */
let checkAndSign = async (
  userAddress: string,
  userTotp: string,
  checkAndSign: boolean,
  safeTxHash: string | undefined,
  safeAddress: string | undefined
) => {
  if (!process.env.SECRETS_TABLE) {
    return;
  }
  const dynamo = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: process.env.SECRETS_TABLE,
    Key: {userAddress}
  }
  const {Item} = await dynamo.get(params).promise();

  if (!Item) return false;

  const isValid = authenticator.check(userTotp, Item.secret)
  if (isValid) {
    if (checkAndSign && safeTxHash && safeAddress) {
      console.log(safeTxHash);
      await executeTx(safeTxHash, safeAddress, Item.iExecPrivateKey);
    }
    return true;
  }
  return false;
}

/**
 * *
 * @param safeTxHash
 * @param safeAddress
 * @param privateKey
 */
const executeTx = async (
  safeTxHash: string,
  safeAddress: string,
  privateKey: string
) => {
  const provider = new providers.JsonRpcProvider(
    `https://goerli.infura.io/v3/77490ac5e5714bd38faf467630943686`,
    5,
  );
  const safeIExecOwner = new ethers.Wallet(privateKey, provider);
  const ethAdapter = new EthersAdapter({
    ethers,
    signer: safeIExecOwner,
  });
  const safeService = new SafeServiceClient({
    txServiceUrl: 'https://safe-transaction.goerli.gnosis.io/',
    ethAdapter
  });
  const safeSdk: Safe = await Safe.create({ethAdapter, safeAddress});


  const signature = await safeSdk.signTransactionHash(safeTxHash)
  await safeService.confirmTransaction(safeTxHash, signature.data)


  const apiTx: SafeMultisigTransactionResponse = await safeService.getTransaction(safeTxHash)
  const safeTx = await safeSdk.createTransaction({
    onlyCalls: false, options: undefined,
    ...apiTx,
    safeTransactionData: {
      to: apiTx.to,
      value: apiTx.value,
      data: apiTx.data || '0x'
    }
  });

  await safeSdk.signTransaction(safeTx)
  const executeTxResponse = await safeSdk.executeTransaction(safeTx)
  await executeTxResponse.transactionResponse?.wait();
};

