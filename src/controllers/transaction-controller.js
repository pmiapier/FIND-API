const prisma = require(`../models/prisma`);
const createError = require('../utils/create-error');

const createTransaction = async (req, res, next) => {
  try {
    const { itemId } = req.body;
    const userId = req.user.id;
  

    const findStatus = await prisma.rent.findFirst({
      where: { id: itemId },
      select: { id: true, ownerId: true, renteeId: true, status: true, amount: true, deposit: true }
    });
  
    if (findStatus.status !== 'completed') {
        next(createError("Not a complete state",400))
    
    }

    const createDataTransaction = await prisma.transaction.createMany({

      data: [
        {
          walletId: findStatus.ownerId,
          rentId: findStatus.id,
          amount: findStatus.amount
        },
        {
 
          walletId: findStatus.renteeId,
          rentId: findStatus.id,
          amount: findStatus.deposit
        }
      ],
    }
    
    );



    console.log("🚀 ~ file: transaction-controller.js:45 ~ createTransaction ~ sum:", createDataTransaction)

    res.status(200).json(createDataTransaction);
  } catch (error) {
    next(error);
  }
};
module.exports = { createTransaction };
