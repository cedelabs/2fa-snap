const express = require('express');
const IExec = require('iexec');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  sendTOTP('127843')
  res.send('Hello World!')
})

const appAddress =
  process.env.APP_ADDRESS || '0x96B78Db315a60b614C6e703A32d3242DBBe4bD1E';

const sendTOTP = async (totp) => {
  const iexec = new IExec({ ethProvider: wallet });

  // send this code to IExec app
  console.log({ totp, appAddress });
  const { orders } = await iexec.orderbook.fetchAppOrderbook(appAddress);
  const appOrder = orders[0].order;
  const { orders: workerpoolOrders } =
    await iexec.orderbook.fetchWorkerpoolOrderbook({ category: 0 });

  const workerpoolOrder = workerpoolOrders[0].order;

  const requestOrderToSign = await iexec.order.createRequestorder({
    app: appAddress,
    appmaxprice: appOrder.appprice,
    workerpoolmaxprice: workerpoolOrder.workerpoolprice,
    category: 0,
    volume: 1,
    params: totp,
  });

  const requestOrder = await iexec.order.signRequestorder(requestOrderToSign);
  console.log(requestOrder);
  const res = await iexec.order.matchOrders({
    apporder: appOrder,
    requestorder: requestOrder,
    workerpoolorder: workerpoolOrder,
  });

  console.log({ res });
  return res;
};

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
