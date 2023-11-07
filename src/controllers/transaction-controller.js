const prisma = require(`../models/prisma`);
const createError = require('../utils/create-error');

const createTransaction = async (req, res, next) => {
  try {
    const { itemId } = req.body
    const userId = req.user.id;
      console.log(itemId, "ITEM ID")
    const findStatus = await prisma.rent.findFirst({
      where: { itemId: itemId },
      select: {
        id: true,
        ownerId: true,
        renteeId: true,
        status: true,
        amount: true,
        deposit: true,
        owner: { select: { wallets: true } },
        rentee: { select: { wallets: true } },
        
      }
    });
    console.log("🚀 ~ file: transaction-controller.js:23 ~ createTransaction ~ findStatus:", findStatus)
    console.log("🚀 ~ file: transaction-controller.js:23 ~ createTransaction ~ findStatus:", findStatus.owner.wallets)
    console.log("🚀 ~ file: transaction-controller.js:23 ~ createTransaction ~ findStatus:", findStatus.rentee.wallets)

    if (findStatus.status !== 'completed') {
      next(createError('Not a complete state', 400));
    }
    const dataTransaction = [
      {
        walletId: findStatus.owner.wallets[0].id,
        rentId: findStatus.id,
        amount: findStatus.amount
      },
      {
        walletId: findStatus.rentee.wallets[0].id,
        rentId: findStatus.id,
        amount: findStatus.deposit
      }
    ];
    console.log("🚀 ~ file: transaction-controller.js:40 ~ createTransaction ~ dataTransaction:", dataTransaction)

    const createDataTransaction = await prisma.transaction.createMany({
      data: dataTransaction
    });

    console.log('🚀 ~ file: transaction-controller.js:45 ~ createTransaction ~ sum:', createDataTransaction);

    
    // next()
    res.status(200).json(createDataTransaction);
  } catch (error) {
    next(error);
  }
};
module.exports = { createTransaction };
