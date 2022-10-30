
import totp from "totp-generator";
import Safe, { SafeFactory, SafeAccountConfig } from '@gnosis.pm/safe-core-sdk';
import {
    SafeTransaction,
    SafeTransactionDataPartial,
} from '@gnosis.pm/safe-core-sdk-types';
import { ethers, providers } from 'ethers';
import EthersAdapter from '@gnosis.pm/safe-ethers-lib';
import SafeServiceClient from '@gnosis.pm/safe-service-client'
const fsPromises = require('fs').promises;
import { EthSignSignature } from '@gnosis.pm/safe-core-sdk'

let sign_transaction = async (hash: string, safeAddress: string) => {
    // put logic inside

    const safeFactory = await SafeFactory.create({ ethAdapter })

    const safeSdk = await Safe.create({ ethAdapter, safeAddress })
    const apiTx: SafeMultisigTransactionResponse = await safeService.getTransaction(safeTxHash)
    let signature = await safeSdk.signTransactionHash(hash)
    await safeService.confirmTransaction(hash, signature.data)
    const executeTxResponse = await safeSdk.executeTransaction(tx)
    const safeTx = await safeSdk.createTransaction({
        onlyCalls: false, options: undefined,
        ...apiTx,
        safeTransactionData: {
            to: apiTx.to,
            value: apiTx.value,
            data: apiTx.data || '0x'
        }
    });
    const executeTxResponse = await safeSdk.executeTransaction(safeTransaction)
    const receipt = executeTxResponse.transactionResponse && (await executeTxResponse.transactionResponse.wait())
}