import totp from "totp-generator";
import Safe, { SafeFactory, SafeAccountConfig } from '@gnosis.pm/safe-core-sdk';
import {
    SafeTransaction,
    SafeTransactionDataPartial,
} from '@gnosis.pm/safe-core-sdk-types';
import { ethers, providers } from 'ethers';
import EthersAdapter from '@gnosis.pm/safe-ethers-lib';
const fsPromises = require('fs').promises;

const HARDCODED_SECRET = 'ETHLISBON'


const iexecOut = process.env.IEXEC_OUT;

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

let sign_transaction = (addr: string) => {
    // put logic inside
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

let signature = async (user_totp: string, safe_transaction_addr: string) => {
    let status = 'INVALID';
    let server_totps = generate_last_totps(HARDCODED_SECRET);
    if (server_totps.includes(user_totp)){
        status = 'VALID';
        await sign_transaction(safe_transaction_addr)
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
            // const transaction_addr = process.argv[4]
            // await signature(user_totp, transaction_addr);
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