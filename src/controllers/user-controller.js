const prisma = require(`../models/prisma`)

const cloundinary = require(`../config/cloudinary`)
const fs = require(`fs`)


const postItem = async (req,res,next)=>{
    try {
        const {title,categories,description,price} = JSON.parse(req.body.json)
        if(req.files){
            const categoriesId = await prisma.categories.findFirst({where:{name:categories}})

            const itemx = await prisma.item.create({
                data:{title,description,price,
                    categoriesId:categoriesId.id,
                    ownerId:req.user.id,
                },
            })
            await req.files.map(async(item,index)=>{
                try {
                    const a = await cloundinary.uploader.upload(item.path)
                    await prisma.itemImage.create({
                        data:{
                            position:index+1,
                            imageUrl:a.secure_url,
                            itemId:itemx.id
                        }
                    })
                } catch (error) {
                    console.log(error);
                }
            })
            res.status(200).json(JSON.parse(req.body.json))
        }
    } catch (error) {
        next(error)
    } finally {
        if(req.files) {
            req.files.map(item=>{
                fs.unlink(item.path)
            })
        }
    }
}

const updateItem = async(req,res,next)=>{
    try {
        const {title,categories,description,price,id,position,itemId} = JSON.parse(req.body.json)

        res.status(200).json({msg:`done`})
    } catch (error) {
        next(error)
    }
}



module.exports ={postItem,updateItem}