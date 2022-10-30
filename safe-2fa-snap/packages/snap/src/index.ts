import { OnRpcRequestHandler } from '@metamask/snap-types';
import {initiateTx} from "site/utils/create-safe";

const transaction2FA = async (request: any) => {
  // Choose account for transaction
  await wallet.request({
    method: 'eth_requestAccounts',
  });

  // Sign transaction
  console.log({ request });
  await initiateTx(request.params.from, request.params);

  // Request TOTP code for 2FA
  const response = await wallet.request({
    method: 'snap_confirm',
    params: [
      {
        prompt: 'Transaction (2FA protection)',
        description: '2FA security',
        textInput: '2fa_code',
      },
    ],
  });

  if (response && '2fa_code' in response) {
    const code = response['2fa_code'];
    await sendTOTP(code);
  }

  console.log({ response });
};

export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  switch (request.method) {
    case '2FA_transaction':
      return transaction2FA(request);

    default:
      throw new Error('Method not found.');
  }
};
