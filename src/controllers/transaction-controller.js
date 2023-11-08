const prisma = require(`../models/prisma`);
const createError = require('../utils/create-error');
const constantStatus = require('../utils/constant/status')
const constantFee = require('../utils/constant/fee')

const createTransaction = async (req, res, next) => {
  try {
    const { itemId } = req.body

      console.log(itemId, "ITEM ID")
    // const findAdmin = await prisma.user.findFirst({
    //   where: {isAdmin:"1"}
    // })
    // console.log("🚀 ~ file: transaction-controller.js:12 ~ createTransaction ~ findAdmin:", findAdmin)


    const findStatus = await prisma.rent.findFirst({
      where: {
        AND: [{itemId: itemId},{status: constantStatus.completed}]
      },
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


    if (findStatus.status === constantStatus.completed) {
      const Fee = constantFee.FEE 
      const serviceCharge = (parseFloat(findStatus.amount) * parseFloat(Fee))
      const dataTransaction = [
        {
          walletId: findStatus.owner.wallets[0].id, // index 0
          rentId: findStatus.id,
          amount: findStatus.amount - serviceCharge
        },
        {
          walletId: findStatus.rentee.wallets[0].id,  // index 1
          rentId: findStatus.id,
          amount: findStatus.deposit
        },
        {
          walletId: 1,
          rentId: findStatus.id,
          amount: serviceCharge
        }
      ]; 
  
      const createDataTransaction = await prisma.transaction.createMany({
        data: dataTransaction
      }); // 1-2-3 row  

        // walletId 1 and 3
        dataTransaction?.map(async (data) => {
            // data row : 2

            // retrun userId = 3 ( All data )
            const findUserIdByWallet = await prisma.wallet.findFirst({
              where: {
                userId: data?.walletId
              }
            });

            // ( amount from transaction + amount userId )
            const updateAmount = parseFloat(data?.amount) + parseFloat(findUserIdByWallet?.amount)
            console.log("🚀 ~ file: transaction-controller.js:73 ~ dataTransaction?.map ~ updateAmount:", updateAmount)

            await prisma.wallet.update({
              where: {
                  id: findUserIdByWallet?.id 
              },
                data: {
                    amount: updateAmount
                }
            });
          });
        
      
      res.status(200).json(createDataTransaction);
    }
      

 
  } catch (error) {
    next(createError("status is not completed ! ",400));
  }
};
module.exports = { createTransaction };
