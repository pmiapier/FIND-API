const prisma = require(`../models/prisma`);
const createError = require('../utils/create-error');
const constantStatus = require('../utils/constant/status')
const constantFee = require('../utils/constant/fee')
const constantPoint = require('../utils/constant/point');
const error = require('../middlewares/error');


const createTransaction = async (req, res, next) => {
  try {
    const { rentId } = req.body
    

      // console.log(rentId, "ITEM ID")
    const findStatus = await prisma.rent.findFirst({
      where: {
        id: rentId
      },
      select: {
        id: true,
        ownerId: true,
        renteeId: true,
        owner_status: true,
        rentee_status:true,
        status: true,
        amount: true,
        deposit: true,
        owner: { select: { wallets: true } },
        rentee: { select: { wallets: true } },
        
      }
    });
    // console.log("🚀 ~ file: transaction-controller.js:28 ~ createTransaction ~ findStatus:", findStatus)
    // console.log("🚀 ~ file: transaction-controller.js:28 ~ createTransaction ~ findStatus:", findStatus?.owner?.wallets)
    // console.log("🚀 ~ file: transaction-controller.js:28 ~ createTransaction ~ findStatus:", findStatus?.rentee?.wallets)


    if (findStatus.owner_status === constantStatus.completed && findStatus.rentee_status === constantStatus.completed) {

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
              },
              
              include:{
                user:{
                  select: {point:true,isAdmin:true},
                
                },
                
              }
            });

            // ( amount from transaction + amount userId )
            const updateAmount = parseFloat(data?.amount) + parseFloat(findUserIdByWallet?.amount)

            
  
            await prisma.wallet.update({
              where: {
                  id: findUserIdByWallet?.id 
              },
                data: {
                    amount: updateAmount,
                }
            });
            // console.log("-----------------------------------------------------")
            // console.log("findUserIdByWallet",findUserIdByWallet)
            // console.log("Point || Admin",findUserIdByWallet.user)
            // console.log("isAdmin",findUserIdByWallet.user.isAdmin)
            
            
            if(findUserIdByWallet?.user.isAdmin == false){
              const updatePoint = parseInt(constantPoint.POINT) + parseInt(findUserIdByWallet.user.point)
              const updatePointttt = await prisma.user.update({
                where: {
                    id: findUserIdByWallet?.userId 
                },
                  data: {
                      point: updatePoint,
                  }
              });
              // console.log("-----------------------------------------------------")
              // console.log("🚀 ~ file: transaction-controller.js:109 ~ dataTransaction?.map ~ updatePointttt:", updatePointttt)
            }
      
          });
          
      res.status(200).json({createDataTransaction});
      // res.status(200).json(createDataTransaction);
      
    }

  } catch (error) {
    // next(createError("status is not completed ! ",400));
    console.log(error)
    next(error)
  }
};

const getTransaction = async(req,res,next) => {
  try {
    const userId = req.user.id
    console.log("🚀 ~ file: transaction-controller.js:113 ~ getTransaction ~ userId:", userId)

    const orderTransactionRentee = await prisma.rent.findMany({
      where: {
        AND: [{renteeId: userId},{rentee_status:constantStatus.completed}]
      },
      select: {
        id: true,
        ownerId: true,
        renteeId: true,
        rentee_status: true,
        owner_status:true,
        amount: true,
        deposit: true,
        createdAt: true
      },
    });
    console.log("🚀 ~ file: transaction-controller.js:128 ~ getTransaction ~ orderTransaction:", orderTransactionRentee)
    console.log("🚀 ~ file: transaction-controller.js:128 ~ getTransaction ~ deposit:", orderTransactionRentee.deposit)
    console.log("--------------------------------------------------------------------------------------------------")

    const orderTransactionOwner = await prisma.rent.findMany({
      where: {
        AND: [{ownerId: userId},{owner_status:constantStatus.completed}]
      },
      select: {
        id: true,
        ownerId: true,
        renteeId: true,
        rentee_status:true,
        owner_status: true,
        amount: true,
        deposit: true,
        createdAt: true
    
      }
    });
    console.log("🚀 ~ file: transaction-controller.js:147 ~ getTransaction ~ orderTransactionOwner:", orderTransactionOwner)

    res.status(200).json({message:"get show order success",orderTransactionRentee,orderTransactionOwner})
    // res.status(200).json({message:"get show order success"})
  } catch (error) {
    next(error)
  }
} 

const getPending = async(req,res,next) => {
  try {
    const userId = req.user.id
    console.log("🚀 ~ file: transaction-controller.js:113 ~ getTransaction ~ userId:", userId)

    const amountStatusRentee = await prisma.rent.aggregate({
      where: {
        AND: [{renteeId: userId},
        {
          OR:[
            {rentee_status:constantStatus.pending_received},{rentee_status:constantStatus.awaiting_payment}
          ]
        }  
        ]
      },
      _sum: {
        // id: true,
        // ownerId: true,
        // renteeId: true,
        // rentee_status: true,
        // owner_status:true,
        // amount: true,
        deposit: true,
        // createdAt: true
      },
    });
    console.log("🚀 ~ file: transaction-controller.js:128 ~ getTransaction ~ amountStatusRentee:", amountStatusRentee)
    // console.log("🚀 ~ file: transaction-controller.js:128 ~ getTransaction ~ amountStatusRentee:", amountStatusRentee.deposit)
    console.log("--------------------------------------------------------------------------------------------------")

    const amountStatusOwner = await prisma.rent.aggregate({
      where: {
        AND: [{ownerId: userId},
        {
          OR:[
            {owner_status:constantStatus.renting},
            {owner_status:constantStatus.pending_delivery}
          ]
        }  
        ]
      },

      // where: {
      //   AND: [{renteeId: userId},
      //   {
      //     OR:[
      //       {rentee_status:constantStatus.pending_received},{rentee_status:constantStatus.awaiting_payment}
      //     ]
      //   }  
      //   ]
      // },


      _sum: {
        // id: true,
        // ownerId: true,
        // renteeId: true,
        // rentee_status:true,
        // owner_status: true,
        amount: true,
        // deposit: true,
        // createdAt: true
    
      }
    });
    console.log("🚀 ~ file: transaction-controller.js:147 ~ getTransaction ~ amountStatusOwner:", amountStatusOwner)


    res.status(200).json({message:"get show order success",amountStatusRentee,amountStatusOwner})
    // res.status(200).json({message:"get show order success"})
  } catch (error) {
    next(error)
  }
} 



module.exports = { createTransaction,getTransaction,getPending };
