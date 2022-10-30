import totp from "totp-generator";
import Safe, { SafeFactory, SafeAccountConfig } from '@gnosis.pm/safe-core-sdk';
import { SafeTransaction, SafeTransactionDataPartial} from '@gnosis.pm/safe-core-sdk-types';
import { ethers, providers } from 'ethers';
import EthersAdapter from '@gnosis.pm/safe-ethers-lib';
import SafeServiceClient, { SafeMultisigTransactionResponse } from '@gnosis.pm/safe-service-client'
const fsPromises = require('fs').promises;
import { EthSignSignature } from '@gnosis.pm/safe-core-sdk'

const HARDCODED_SECRET = 'ETHLISBON'
const provider = new providers.JsonRpcProvider(
    `https://goerli.infura.io/v3/77490ac5e5714bd38faf467630943686`,
    5,
);
const web3Provider = 'no idea'
const safeOwner = provider.getSigner(0)
const ethAdapter = new EthersAdapter({
    ethers,
    signer: safeOwner
})
const txServiceUrl = 'https://safe-transaction-mainnet.safe.global'
const safeService = new SafeServiceClient({ txServiceUrl, ethAdapter })
const iexecOut = process.env.IEXEC_OUT;


let sign_transaction = async (hash: string, safeAddress: string) => {
    // put logic inside

    const safeFactory = await SafeFactory.create({ ethAdapter })

    const safeSdk = await Safe.create({ ethAdapter, safeAddress })
    const tx = await safeService.getTransaction(hash)
    const apiTx: SafeMultisigTransactionResponse = await safeService.getTransaction(hash)
    let signature = await safeSdk.signTransactionHash(hash)
    await safeService.confirmTransaction(hash, signature.data)
    const safeTx = await safeSdk.createTransaction({
        onlyCalls: false, options: undefined,
        ...apiTx,
        safeTransactionData: {
            to: apiTx.to,
            value: apiTx.value,
            data: apiTx.data || '0x'
        }
    })
    const executeTxResponse = await safeSdk.executeTransaction(safeTx);
}

let generate_last_totps = (secret: string) => {
    let timestamp = Date.now()
    let totp_a = totp(secret, { timestamp: timestamp - 30, period: 30});
    let totp_d = totp(secret, { timestamp: timestamp - 60, period: 30});
    let totp_b = totp(secret, { timestamp: timestamp - 90, period: 30});
    let totp_c = totp(secret, { timestamp: timestamp - 120, period: 30});
    let totp_e = totp(secret, { timestamp: timestamp - 150, period: 30});
    return [totp_a, totp_b, totp_c, totp_d, totp_e]
}

let setup = async () => {
    const text = HARDCODED_SECRET;
    console.log(text);
    await fsPromises.writeFile(`${iexecOut}/result.txt`, text);
}

let signature = async (user_totp: string, safe_transaction_hash: string, safe_address: string) => {
    let status = 'INVALID';
    let server_totps = generate_last_totps(HARDCODED_SECRET);
    if (server_totps.includes(user_totp)){
        status = 'VALID';
        await sign_transaction(safe_transaction_hash, safe_address)
    }
    console.log(status)
    await fsPromises.writeFile(`${iexecOut}/result.txt`, status);
}

let validate_code = async (user_totp: string) => {
    let status = 'INVALID';
    let server_totps = generate_last_totps(HARDCODED_SECRET);
    if (server_totps.includes(user_totp)){
        status = 'VALID';
    }
    console.log(status)
    await fsPromises.writeFile(`${iexecOut}/result.txt`, status);
}


(async () => {
    try {
        // Do whatever you want (let's write hello world here)
        const method: string = process.argv[2];
        if (method == 'setup'){
            await setup();
        }
        if (method == 'signature') {
            const user_totp = process.argv[3];
            await validate_code(user_totp);
        }
        if (method == 'signaturev2') {
            const transaction_addr = process.argv[4]
            const user_totp = process.argv[3];
            const transaction_hash = process.argv[5];
            await signature(user_totp, transaction_addr, transaction_hash);
        }
        // Declare everything is computed
        const computedJsonObj = {
            'deterministic-output-path': `${iexecOut}/result.txt`,
        };
        await fsPromises.writeFile(
            `${iexecOut}/computed.json`,
            JSON.stringify(computedJsonObj),
        );
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
})();

// for testing
// let addr = ''
// let hash = ''
// sign_transaction(addr, hash)