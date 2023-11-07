const prisma = require(`../models/prisma`);

const updateWallet = async (req, res, next) => {
  try {
    // const userId = req.user.id
    const {walletId} = req.body;
    console.log('🚀 ~ file: wallet-controller.js:9 ~ updateWal ~ userId:', walletId);

    const findWalletId = await prisma.transaction.findFirst({
      where: { walletId: +walletId },
      select: { id: true,walletId:true,rentId:true, amount:true }
    });
    console.log('🚀 ~ file: wallet-controller.js:17 ~ updateWal ~ findWalletId:', findWalletId);
    // console.log(
    //   '🚀 ~ file: wallet-controller.js:15 ~ updateWal ~ findWalletId transactions:',
    //   findWalletId.wallet.transactions
    // );

    // const findBalanceInWallet = await prisma.transaction.findFirst({
    //   where: {

    //     AND: [
    //       { amount: findWalletId.amount }
    //       // {transactions:findWalletId.transactions[0].id}
    //     ]
    //   }
    // });
    // console.log('🚀 ~ file: wallet-controller.js:21 ~ updateWal ~ findBalanceInWallet:', findBalanceInWallet);
    // const findAmountOld = await prisma.transaction.findFirst({

    // })
    res.status(200).json('done');
  } catch (error) {
    console.log(error);
  }
};

module.exports = { updateWallet };
