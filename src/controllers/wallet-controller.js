const prisma = require(`../models/prisma`);

const withdraw = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const findAmountOld = await prisma.wallet.findFirst({
      where: { userId: userId },
      select: { id: true, userId: true, amount: true }
    });
    // console.log("🚀 ~ file: wallet-controller.js:11 ~ withdraw ~ findWallet:", findAmountOld)

    const updateAmountMoneyAfterWithdraw = parseFloat(findAmountOld?.amount) - parseFloat(findAmountOld?.amount);
    const updateWallet = await prisma.wallet.update({
      where: {
        id: +findAmountOld.id
      },
      data: {
        amount: updateAmountMoneyAfterWithdraw
      }
    });
    req.wallet = updateWallet

    res.status(200).json(findAmountOld);
    next()
  } catch (error) {
    console.log(error);
  }
};

const getWallet = async (req, res, next) => {
  const userId = req.user.id;
  console.log('🚀 ~ file: wallet-controller.js:9 ~ updateWal ~ userId:', userId);

  const amountOfMoney = await prisma.wallet.findFirst({
    where: { userId: userId },
    select: { id: true, userId: true, amount: true }
  });
  console.log('🚀 ~ file: wallet-controller.js:11 ~ withdraw ~ findWallet:', amountOfMoney);

  res.status(200).json(amountOfMoney);
};

module.exports = { withdraw, getWallet };
