import { IExec } from 'iexec';

const appAddress =
  process.env.APP_ADDRESS || '0xB901732A47153F3e868e4e0Bfa6850BCB8f534E8';

const iexec = new IExec({ ethProvider: (window as any).ethereum });

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

export const iexecTx = async () => {
  await sendTOTP('123749');
};
