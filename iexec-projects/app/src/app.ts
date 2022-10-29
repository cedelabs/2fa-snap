import totp from "totp-generator";
const fsPromises = require('fs').promises;
const figlet = require('figlet');
// Keys provided must be base32 strings, ie. only containing characters matching (A-Z, 2-7, =).
const token = totp("JBSWY3DPEHPK3PXP");

console.log(token);

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


(async () => {
    try {
        const iexecOut = process.env.IEXEC_OUT;
        // Do whatever you want (let's write hello world here)
        const message = process.argv.length > 2 ? process.argv[2] : 'World';

        const text = figlet.textSync(`Hello, ${message}!`); // Let's add some art for e.g.
        console.log(text);
        // Append some results in /iexec_out/
        await fsPromises.writeFile(`${iexecOut}/result.txt`, text);
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