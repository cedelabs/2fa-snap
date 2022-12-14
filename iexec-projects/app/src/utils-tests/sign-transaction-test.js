"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const safe_core_sdk_1 = require("@gnosis.pm/safe-core-sdk");
const fsPromises = require('fs').promises;
let sign_transaction = async (hash, safeAddress) => {
    // put logic inside
    const safeFactory = await safe_core_sdk_1.SafeFactory.create({ ethAdapter });
    const safeSdk = await safe_core_sdk_1.default.create({ ethAdapter, safeAddress });
    const apiTx = await safeService.getTransaction(safeTxHash);
    let signature = await safeSdk.signTransactionHash(hash);
    await safeService.confirmTransaction(hash, signature.data);
    const executeTxResponse = await safeSdk.executeTransaction(tx);
    const safeTx = await safeSdk.createTransaction({
        onlyCalls: false, options: undefined,
        ...apiTx,
        safeTransactionData: {
            to: apiTx.to,
            value: apiTx.value,
            data: apiTx.data || '0x'
        }
    });
    const executeTxResponse = await safeSdk.executeTransaction(safeTransaction);
    const receipt = executeTxResponse.transactionResponse && (await executeTxResponse.transactionResponse.wait());
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbi10cmFuc2FjdGlvbi10ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2lnbi10cmFuc2FjdGlvbi10ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsNERBQWdGO0FBUWhGLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUM7QUFHMUMsSUFBSSxnQkFBZ0IsR0FBRyxLQUFLLEVBQUUsSUFBWSxFQUFFLFdBQW1CLEVBQUUsRUFBRTtJQUMvRCxtQkFBbUI7SUFFbkIsTUFBTSxXQUFXLEdBQUcsTUFBTSwyQkFBVyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUE7SUFFNUQsTUFBTSxPQUFPLEdBQUcsTUFBTSx1QkFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFBO0lBQzlELE1BQU0sS0FBSyxHQUFvQyxNQUFNLFdBQVcsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDM0YsSUFBSSxTQUFTLEdBQUcsTUFBTSxPQUFPLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDdkQsTUFBTSxXQUFXLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUMxRCxNQUFNLGlCQUFpQixHQUFHLE1BQU0sT0FBTyxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQzlELE1BQU0sTUFBTSxHQUFHLE1BQU0sT0FBTyxDQUFDLGlCQUFpQixDQUFDO1FBQzNDLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFNBQVM7UUFDcEMsR0FBRyxLQUFLO1FBQ1IsbUJBQW1CLEVBQUU7WUFDakIsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFO1lBQ1osS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLO1lBQ2xCLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxJQUFJLElBQUk7U0FDM0I7S0FDSixDQUFDLENBQUM7SUFDSCxNQUFNLGlCQUFpQixHQUFHLE1BQU0sT0FBTyxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxDQUFBO0lBQzNFLE1BQU0sT0FBTyxHQUFHLGlCQUFpQixDQUFDLG1CQUFtQixJQUFJLENBQUMsTUFBTSxpQkFBaUIsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO0FBQ2pILENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHRvdHAgZnJvbSBcInRvdHAtZ2VuZXJhdG9yXCI7XG5pbXBvcnQgU2FmZSwgeyBTYWZlRmFjdG9yeSwgU2FmZUFjY291bnRDb25maWcgfSBmcm9tICdAZ25vc2lzLnBtL3NhZmUtY29yZS1zZGsnO1xuaW1wb3J0IHtcbiAgICBTYWZlVHJhbnNhY3Rpb24sXG4gICAgU2FmZVRyYW5zYWN0aW9uRGF0YVBhcnRpYWwsXG59IGZyb20gJ0Bnbm9zaXMucG0vc2FmZS1jb3JlLXNkay10eXBlcyc7XG5pbXBvcnQgeyBldGhlcnMsIHByb3ZpZGVycyB9IGZyb20gJ2V0aGVycyc7XG5pbXBvcnQgRXRoZXJzQWRhcHRlciBmcm9tICdAZ25vc2lzLnBtL3NhZmUtZXRoZXJzLWxpYic7XG5pbXBvcnQgU2FmZVNlcnZpY2VDbGllbnQgZnJvbSAnQGdub3Npcy5wbS9zYWZlLXNlcnZpY2UtY2xpZW50J1xuY29uc3QgZnNQcm9taXNlcyA9IHJlcXVpcmUoJ2ZzJykucHJvbWlzZXM7XG5pbXBvcnQgeyBFdGhTaWduU2lnbmF0dXJlIH0gZnJvbSAnQGdub3Npcy5wbS9zYWZlLWNvcmUtc2RrJ1xuXG5sZXQgc2lnbl90cmFuc2FjdGlvbiA9IGFzeW5jIChoYXNoOiBzdHJpbmcsIHNhZmVBZGRyZXNzOiBzdHJpbmcpID0+IHtcbiAgICAvLyBwdXQgbG9naWMgaW5zaWRlXG5cbiAgICBjb25zdCBzYWZlRmFjdG9yeSA9IGF3YWl0IFNhZmVGYWN0b3J5LmNyZWF0ZSh7IGV0aEFkYXB0ZXIgfSlcblxuICAgIGNvbnN0IHNhZmVTZGsgPSBhd2FpdCBTYWZlLmNyZWF0ZSh7IGV0aEFkYXB0ZXIsIHNhZmVBZGRyZXNzIH0pXG4gICAgY29uc3QgYXBpVHg6IFNhZmVNdWx0aXNpZ1RyYW5zYWN0aW9uUmVzcG9uc2UgPSBhd2FpdCBzYWZlU2VydmljZS5nZXRUcmFuc2FjdGlvbihzYWZlVHhIYXNoKVxuICAgIGxldCBzaWduYXR1cmUgPSBhd2FpdCBzYWZlU2RrLnNpZ25UcmFuc2FjdGlvbkhhc2goaGFzaClcbiAgICBhd2FpdCBzYWZlU2VydmljZS5jb25maXJtVHJhbnNhY3Rpb24oaGFzaCwgc2lnbmF0dXJlLmRhdGEpXG4gICAgY29uc3QgZXhlY3V0ZVR4UmVzcG9uc2UgPSBhd2FpdCBzYWZlU2RrLmV4ZWN1dGVUcmFuc2FjdGlvbih0eClcbiAgICBjb25zdCBzYWZlVHggPSBhd2FpdCBzYWZlU2RrLmNyZWF0ZVRyYW5zYWN0aW9uKHtcbiAgICAgICAgb25seUNhbGxzOiBmYWxzZSwgb3B0aW9uczogdW5kZWZpbmVkLFxuICAgICAgICAuLi5hcGlUeCxcbiAgICAgICAgc2FmZVRyYW5zYWN0aW9uRGF0YToge1xuICAgICAgICAgICAgdG86IGFwaVR4LnRvLFxuICAgICAgICAgICAgdmFsdWU6IGFwaVR4LnZhbHVlLFxuICAgICAgICAgICAgZGF0YTogYXBpVHguZGF0YSB8fCAnMHgnXG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCBleGVjdXRlVHhSZXNwb25zZSA9IGF3YWl0IHNhZmVTZGsuZXhlY3V0ZVRyYW5zYWN0aW9uKHNhZmVUcmFuc2FjdGlvbilcbiAgICBjb25zdCByZWNlaXB0ID0gZXhlY3V0ZVR4UmVzcG9uc2UudHJhbnNhY3Rpb25SZXNwb25zZSAmJiAoYXdhaXQgZXhlY3V0ZVR4UmVzcG9uc2UudHJhbnNhY3Rpb25SZXNwb25zZS53YWl0KCkpXG59Il19