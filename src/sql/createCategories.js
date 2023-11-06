const prisma = require(`../models/prisma`)


const categoriesList = [`Appliances`,`Electronics`,`Vehicles`,`Baby`,`Tools`,`Camping`,`Hiking`,`Clothing`,`Sport`,`Book`]


const createCategoriesList = async ()=>{
    categoriesList.map(async x=>{
        await prisma.categories.create({
            data:{name:x}
        })
    })
}

createCategoriesList()


// module.exports = createCategoriesList