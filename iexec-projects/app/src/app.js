"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const totp_generator_1 = require("totp-generator");
const fsPromises = require('fs').promises;
const HARDCODED_SECRET = 'ETHLISBON';
const iexecOut = process.env.IEXEC_OUT;
// export const executeTx = async (
//     safeTransaction: SafeTransaction,
//     safeAddress: string,
// ) => {
//     const provider = new providers.JsonRpcProvider(
//         `https://goerli.infura.io/v3/77490ac5e5714bd38faf467630943686`,
//         5,
//     );
//     const privateKey = process.env.REACT_APP_PRIVATE_KEY || '';
//     const safeIExecOwner = new ethers.Wallet(privateKey, provider);
//     const ethAdapter = new EthersAdapter({
//         ethers,
//         signer: safeIExecOwner,
//     });
//     const safeSdk: Safe = await Safe.create({ ethAdapter, safeAddress });
//     const executeTxResponse = await safeSdk.executeTransaction(safeTransaction);
//     await executeTxResponse.transactionResponse?.wait();
// };
let generate_last_totps = (secret) => {
    let timestamp = Date.now();
    let totp_a = (0, totp_generator_1.default)(secret, { timestamp: timestamp - 30 });
    let totp_d = (0, totp_generator_1.default)(secret, { timestamp: timestamp - 60 });
    let totp_b = (0, totp_generator_1.default)(secret, { timestamp: timestamp - 90 });
    let totp_c = (0, totp_generator_1.default)(secret, { timestamp: timestamp - 120 });
    let totp_e = (0, totp_generator_1.default)(secret, { timestamp: timestamp - 150 });
    return [totp_a, totp_b, totp_c, totp_d, totp_e];
};
let setup = async () => {
    const text = HARDCODED_SECRET;
    console.log(text);
    await fsPromises.writeFile(`${iexecOut}/result.txt`, text);
};
let signature = async (user_totp) => {
    let status = 'INVALID';
    let server_totps = generate_last_totps(HARDCODED_SECRET);
    if (server_totps.includes(user_totp)) {
        status = 'VALID';
    }
    console.log(status);
    await fsPromises.writeFile(`${iexecOut}/result.txt`, status);
};
(async () => {
    try {
        // Do whatever you want (let's write hello world here)
        const method = process.argv[2];
        if (method == 'setup') {
            await setup();
        }
        if (method == 'signature') {
            const user_totp = process.argv[3];
            await signature(user_totp);
        }
        // Declare everything is computed
        const computedJsonObj = {
            'deterministic-output-path': `${iexecOut}/result.txt`,
        };
        await fsPromises.writeFile(`${iexecOut}/computed.json`, JSON.stringify(computedJsonObj));
    }
    catch (e) {
        console.log(e);
        process.exit(1);
    }
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQWtDO0FBUWxDLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUM7QUFFMUMsTUFBTSxnQkFBZ0IsR0FBRyxXQUFXLENBQUE7QUFHcEMsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUM7QUFFdkMsbUNBQW1DO0FBQ25DLHdDQUF3QztBQUN4QywyQkFBMkI7QUFDM0IsU0FBUztBQUNULHNEQUFzRDtBQUN0RCwwRUFBMEU7QUFDMUUsYUFBYTtBQUNiLFNBQVM7QUFDVCxrRUFBa0U7QUFDbEUsc0VBQXNFO0FBQ3RFLDZDQUE2QztBQUM3QyxrQkFBa0I7QUFDbEIsa0NBQWtDO0FBQ2xDLFVBQVU7QUFDViw0RUFBNEU7QUFDNUUsbUZBQW1GO0FBQ25GLDJEQUEyRDtBQUMzRCxLQUFLO0FBRUwsSUFBSSxtQkFBbUIsR0FBRyxDQUFDLE1BQWMsRUFBRSxFQUFFO0lBQ3pDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUMxQixJQUFJLE1BQU0sR0FBRyxJQUFBLHdCQUFJLEVBQUMsTUFBTSxFQUFFLEVBQUUsU0FBUyxFQUFFLFNBQVMsR0FBRyxFQUFFLEVBQUMsQ0FBQyxDQUFDO0lBQ3hELElBQUksTUFBTSxHQUFHLElBQUEsd0JBQUksRUFBQyxNQUFNLEVBQUUsRUFBRSxTQUFTLEVBQUUsU0FBUyxHQUFHLEVBQUUsRUFBQyxDQUFDLENBQUM7SUFDeEQsSUFBSSxNQUFNLEdBQUcsSUFBQSx3QkFBSSxFQUFDLE1BQU0sRUFBRSxFQUFFLFNBQVMsRUFBRSxTQUFTLEdBQUcsRUFBRSxFQUFDLENBQUMsQ0FBQztJQUN4RCxJQUFJLE1BQU0sR0FBRyxJQUFBLHdCQUFJLEVBQUMsTUFBTSxFQUFFLEVBQUUsU0FBUyxFQUFFLFNBQVMsR0FBRyxHQUFHLEVBQUMsQ0FBQyxDQUFDO0lBQ3pELElBQUksTUFBTSxHQUFHLElBQUEsd0JBQUksRUFBQyxNQUFNLEVBQUUsRUFBRSxTQUFTLEVBQUUsU0FBUyxHQUFHLEdBQUcsRUFBQyxDQUFDLENBQUM7SUFDekQsT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQTtBQUNuRCxDQUFDLENBQUE7QUFFRCxJQUFJLEtBQUssR0FBRyxLQUFLLElBQUksRUFBRTtJQUNuQixNQUFNLElBQUksR0FBRyxnQkFBZ0IsQ0FBQztJQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xCLE1BQU0sVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLFFBQVEsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQy9ELENBQUMsQ0FBQTtBQUVELElBQUksU0FBUyxHQUFHLEtBQUssRUFBRSxTQUFpQixFQUFFLEVBQUU7SUFDeEMsSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDO0lBQ3ZCLElBQUksWUFBWSxHQUFHLG1CQUFtQixDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDekQsSUFBSSxZQUFZLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFDO1FBQ2pDLE1BQU0sR0FBRyxPQUFPLENBQUM7S0FDcEI7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ25CLE1BQU0sVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLFFBQVEsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ2pFLENBQUMsQ0FBQTtBQUVELENBQUMsS0FBSyxJQUFJLEVBQUU7SUFDUixJQUFJO1FBQ0Esc0RBQXNEO1FBQ3RELE1BQU0sTUFBTSxHQUFXLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkMsSUFBSSxNQUFNLElBQUksT0FBTyxFQUFDO1lBQ2xCLE1BQU0sS0FBSyxFQUFFLENBQUM7U0FDakI7UUFDRCxJQUFJLE1BQU0sSUFBSSxXQUFXLEVBQUU7WUFDdkIsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQyxNQUFNLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUM5QjtRQUNELGlDQUFpQztRQUNqQyxNQUFNLGVBQWUsR0FBRztZQUNwQiwyQkFBMkIsRUFBRSxHQUFHLFFBQVEsYUFBYTtTQUN4RCxDQUFDO1FBQ0YsTUFBTSxVQUFVLENBQUMsU0FBUyxDQUN0QixHQUFHLFFBQVEsZ0JBQWdCLEVBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLENBQ2xDLENBQUM7S0FDTDtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNmLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDbkI7QUFDTCxDQUFDLENBQUMsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHRvdHAgZnJvbSBcInRvdHAtZ2VuZXJhdG9yXCI7XG5pbXBvcnQgU2FmZSwgeyBTYWZlRmFjdG9yeSwgU2FmZUFjY291bnRDb25maWcgfSBmcm9tICdAZ25vc2lzLnBtL3NhZmUtY29yZS1zZGsnO1xuaW1wb3J0IHtcbiAgICBTYWZlVHJhbnNhY3Rpb24sXG4gICAgU2FmZVRyYW5zYWN0aW9uRGF0YVBhcnRpYWwsXG59IGZyb20gJ0Bnbm9zaXMucG0vc2FmZS1jb3JlLXNkay10eXBlcyc7XG5pbXBvcnQgeyBldGhlcnMsIHByb3ZpZGVycyB9IGZyb20gJ2V0aGVycyc7XG5pbXBvcnQgRXRoZXJzQWRhcHRlciBmcm9tICdAZ25vc2lzLnBtL3NhZmUtZXRoZXJzLWxpYic7XG5jb25zdCBmc1Byb21pc2VzID0gcmVxdWlyZSgnZnMnKS5wcm9taXNlcztcblxuY29uc3QgSEFSRENPREVEX1NFQ1JFVCA9ICdFVEhMSVNCT04nXG5cblxuY29uc3QgaWV4ZWNPdXQgPSBwcm9jZXNzLmVudi5JRVhFQ19PVVQ7XG5cbi8vIGV4cG9ydCBjb25zdCBleGVjdXRlVHggPSBhc3luYyAoXG4vLyAgICAgc2FmZVRyYW5zYWN0aW9uOiBTYWZlVHJhbnNhY3Rpb24sXG4vLyAgICAgc2FmZUFkZHJlc3M6IHN0cmluZyxcbi8vICkgPT4ge1xuLy8gICAgIGNvbnN0IHByb3ZpZGVyID0gbmV3IHByb3ZpZGVycy5Kc29uUnBjUHJvdmlkZXIoXG4vLyAgICAgICAgIGBodHRwczovL2dvZXJsaS5pbmZ1cmEuaW8vdjMvNzc0OTBhYzVlNTcxNGJkMzhmYWY0Njc2MzA5NDM2ODZgLFxuLy8gICAgICAgICA1LFxuLy8gICAgICk7XG4vLyAgICAgY29uc3QgcHJpdmF0ZUtleSA9IHByb2Nlc3MuZW52LlJFQUNUX0FQUF9QUklWQVRFX0tFWSB8fCAnJztcbi8vICAgICBjb25zdCBzYWZlSUV4ZWNPd25lciA9IG5ldyBldGhlcnMuV2FsbGV0KHByaXZhdGVLZXksIHByb3ZpZGVyKTtcbi8vICAgICBjb25zdCBldGhBZGFwdGVyID0gbmV3IEV0aGVyc0FkYXB0ZXIoe1xuLy8gICAgICAgICBldGhlcnMsXG4vLyAgICAgICAgIHNpZ25lcjogc2FmZUlFeGVjT3duZXIsXG4vLyAgICAgfSk7XG4vLyAgICAgY29uc3Qgc2FmZVNkazogU2FmZSA9IGF3YWl0IFNhZmUuY3JlYXRlKHsgZXRoQWRhcHRlciwgc2FmZUFkZHJlc3MgfSk7XG4vLyAgICAgY29uc3QgZXhlY3V0ZVR4UmVzcG9uc2UgPSBhd2FpdCBzYWZlU2RrLmV4ZWN1dGVUcmFuc2FjdGlvbihzYWZlVHJhbnNhY3Rpb24pO1xuLy8gICAgIGF3YWl0IGV4ZWN1dGVUeFJlc3BvbnNlLnRyYW5zYWN0aW9uUmVzcG9uc2U/LndhaXQoKTtcbi8vIH07XG5cbmxldCBnZW5lcmF0ZV9sYXN0X3RvdHBzID0gKHNlY3JldDogc3RyaW5nKSA9PiB7XG4gICAgbGV0IHRpbWVzdGFtcCA9IERhdGUubm93KClcbiAgICBsZXQgdG90cF9hID0gdG90cChzZWNyZXQsIHsgdGltZXN0YW1wOiB0aW1lc3RhbXAgLSAzMH0pO1xuICAgIGxldCB0b3RwX2QgPSB0b3RwKHNlY3JldCwgeyB0aW1lc3RhbXA6IHRpbWVzdGFtcCAtIDYwfSk7XG4gICAgbGV0IHRvdHBfYiA9IHRvdHAoc2VjcmV0LCB7IHRpbWVzdGFtcDogdGltZXN0YW1wIC0gOTB9KTtcbiAgICBsZXQgdG90cF9jID0gdG90cChzZWNyZXQsIHsgdGltZXN0YW1wOiB0aW1lc3RhbXAgLSAxMjB9KTtcbiAgICBsZXQgdG90cF9lID0gdG90cChzZWNyZXQsIHsgdGltZXN0YW1wOiB0aW1lc3RhbXAgLSAxNTB9KTtcbiAgICByZXR1cm4gW3RvdHBfYSwgdG90cF9iLCB0b3RwX2MsIHRvdHBfZCwgdG90cF9lXVxufVxuXG5sZXQgc2V0dXAgPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgdGV4dCA9IEhBUkRDT0RFRF9TRUNSRVQ7XG4gICAgY29uc29sZS5sb2codGV4dCk7XG4gICAgYXdhaXQgZnNQcm9taXNlcy53cml0ZUZpbGUoYCR7aWV4ZWNPdXR9L3Jlc3VsdC50eHRgLCB0ZXh0KTtcbn1cblxubGV0IHNpZ25hdHVyZSA9IGFzeW5jICh1c2VyX3RvdHA6IHN0cmluZykgPT4ge1xuICAgIGxldCBzdGF0dXMgPSAnSU5WQUxJRCc7XG4gICAgbGV0IHNlcnZlcl90b3RwcyA9IGdlbmVyYXRlX2xhc3RfdG90cHMoSEFSRENPREVEX1NFQ1JFVCk7XG4gICAgaWYgKHNlcnZlcl90b3Rwcy5pbmNsdWRlcyh1c2VyX3RvdHApKXtcbiAgICAgICAgc3RhdHVzID0gJ1ZBTElEJztcbiAgICB9XG4gICAgY29uc29sZS5sb2coc3RhdHVzKVxuICAgIGF3YWl0IGZzUHJvbWlzZXMud3JpdGVGaWxlKGAke2lleGVjT3V0fS9yZXN1bHQudHh0YCwgc3RhdHVzKTtcbn1cblxuKGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgICAvLyBEbyB3aGF0ZXZlciB5b3Ugd2FudCAobGV0J3Mgd3JpdGUgaGVsbG8gd29ybGQgaGVyZSlcbiAgICAgICAgY29uc3QgbWV0aG9kOiBzdHJpbmcgPSBwcm9jZXNzLmFyZ3ZbMl07XG4gICAgICAgIGlmIChtZXRob2QgPT0gJ3NldHVwJyl7XG4gICAgICAgICAgICBhd2FpdCBzZXR1cCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtZXRob2QgPT0gJ3NpZ25hdHVyZScpIHtcbiAgICAgICAgICAgIGNvbnN0IHVzZXJfdG90cCA9IHByb2Nlc3MuYXJndlszXTtcbiAgICAgICAgICAgIGF3YWl0IHNpZ25hdHVyZSh1c2VyX3RvdHApO1xuICAgICAgICB9XG4gICAgICAgIC8vIERlY2xhcmUgZXZlcnl0aGluZyBpcyBjb21wdXRlZFxuICAgICAgICBjb25zdCBjb21wdXRlZEpzb25PYmogPSB7XG4gICAgICAgICAgICAnZGV0ZXJtaW5pc3RpYy1vdXRwdXQtcGF0aCc6IGAke2lleGVjT3V0fS9yZXN1bHQudHh0YCxcbiAgICAgICAgfTtcbiAgICAgICAgYXdhaXQgZnNQcm9taXNlcy53cml0ZUZpbGUoXG4gICAgICAgICAgICBgJHtpZXhlY091dH0vY29tcHV0ZWQuanNvbmAsXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeShjb21wdXRlZEpzb25PYmopLFxuICAgICAgICApO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgICB9XG59KSgpOyJdfQ==