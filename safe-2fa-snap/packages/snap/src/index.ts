import { OnRpcRequestHandler } from '@metamask/snap-types';
import { IExec } from 'iexec';
// import { providers } from 'ethers';
// import Web3 from 'web3';
// import {MetaMaskInpageProvider} from "@metamask/providers";
const appAddress =
  process.env.APP_ADDRESS || '0xB901732A47153F3e868e4e0Bfa6850BCB8f534E8';

// const provider = new providers.JsonRpcProvider(
//   'https://goerli.infura.io/v3/77490ac5e5714bd38faf467630943686',
//   5,
// );

// const provider = new Web3.providers.HttpProvider(
//   'https://goerli.infura.io/v3/77490ac5e5714bd38faf467630943686',
// );

const iexec = new IExec({ ethProvider: wallet as unknown as any });

const sendTOTP = async (totp: string) => {
  // send this code to IExec app
  console.log({ totp, appAddress });
  const { orders } = await iexec.orderbook.fetchAppOrderbook(appAddress);
  const appOrder = orders?.[0]?.order;
  const { orders: workerpoolOrders } =
    await iexec.orderbook.fetchWorkerpoolOrderbook({ category: 0 });

  const workerpoolOrder = workerpoolOrders?.[0]?.order;

  const requestOrderToSign = await iexec.order.createRequestorder({
    app: appAddress,
    appmaxprice: appOrder.appprice,
    workerpoolmaxprice: workerpoolOrder.workerpoolprice,
    category: 0,
    volume: 1,
    params: totp,
  });

  const requestOrder = await iexec.order.signRequestorder(requestOrderToSign);

  const res = await iexec.order.matchOrders({
    apporder: appOrder,
    requestorder: requestOrder,
    workerpoolorder: workerpoolOrder,
  });

  console.log({ res });
  return res;
};

const transaction2FA = async (request: any) => {

  // Choose account for transaction
  await wallet.request({
    method: 'eth_requestAccounts',
  });

  // Sign transaction
  /* await wallet.request({
   method: 'eth_sendTransaction',
   params: request.params,
   });*/



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
    return await sendTOTP(code);
  }

  console.log({ response, request });
};

export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  switch (request.method) {
    case '2FA_transaction':
      return transaction2FA(request);

    default:
      throw new Error('Method not found.');
  }
};
