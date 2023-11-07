const prisma = require(`../models/prisma`);

const withdraw = async (req, res, next) => {
  try {
    // const userId = req.user.id
    const {userId} = req.body
    console.log('🚀 ~ file: wallet-controller.js:9 ~ updateWal ~ userId:', userId);
    
    const findAmountOld = await prisma.wallet.findFirst({
        where: {userId:userId},
        select:{userId:true,amount:true}

    })
    console.log("🚀 ~ file: wallet-controller.js:11 ~ withdraw ~ findWallet:", findAmountOld)

    const updateAmountMoneyAfterWithdraw = parseFloat(findAmountOld?.amount) - parseFloat(findAmountOld?.amount)
    const t = await prisma.wallet.update({
        where: {
            id: userId // id wrong
        },
        data: {
            amount: updateAmountMoneyAfterWithdraw
        }
    });
    console.log("🚀 ~ file: wallet-controller.js:17 ~ withdraw ~ updateAmountMoneyAfterWithdraw:", updateAmountMoneyAfterWithdraw)
    console.log("🚀 ~ file: wallet-controller.js:17 ~ withdraw ~ update:", t)
   
    res.status(200).json("done");
  } catch (error) {
    console.log(error);
  }
};

const getWallet = async (req,res,next) => {
    const userId = req.user.id
    console.log('🚀 ~ file: wallet-controller.js:9 ~ updateWal ~ userId:', userId);
    
    const amountOfMoney = await prisma.wallet.findFirst({
        where: {userId:userId}
    })
    console.log("🚀 ~ file: wallet-controller.js:11 ~ withdraw ~ findWallet:", amountOfMoney)

    res.status(200).json(amountOfMoney);
}

module.exports = { withdraw,getWallet };
