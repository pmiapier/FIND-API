const prisma = require(`../models/prisma`);

const updateWallet = async (req, res, next) => {
  try {
    // const userId = req.user.id
    const { walletId } = req.body;
    console.log('🚀 ~ file: wallet-controller.js:9 ~ updateWal ~ userId:', walletId);

    const findWalletId = await prisma.transaction.findMany({
      where: { walletId: +walletId },
      select: { id: true, walletId: true, rentId: true, amount: true },
      orderBy: { createdAt: 'desc' },
      take: 2
    });
    console.log('🚀 ~ file: wallet-controller.js:17 ~ updateWal ~ findWalletId:', findWalletId);
  
    res.status(200).json('done');
  } catch (error) {
    console.log(error);
  }
};

module.exports = { updateWallet };
