const prisma = require(`../models/prisma`);
const bcrypt = require(`bcryptjs`);

const cloundinary = require(`../config/cloudinary`);
const fs = require(`fs`);
const { updateUserSchema } = require('../validators/user-validator');
const createError = require('../utils/create-error');

const postItem = async (req, res, next) => {
  try {
    const { itemName, itemCategory, itemDescription, itemPrice, availability } = req.body;
    console.log(availability, '------s');
    if (req.files) {
      const categoriesId = await prisma.categories.findFirst({ where: { name: itemCategory } });

      const itemx = await prisma.item.create({
        data: {
          title: itemName,
          description: itemDescription,
          price: itemPrice,
          categoriesId: categoriesId.id,
          ownerId: req.user.id,
          status: availability
        }
      });

      const uploadPromises = await req.files.map(async (item, index) => {
        try {
          const a = await cloundinary.uploader.upload(item.path);
          fs.unlink(item.path, (err) => {
            if (err) next(err);
          });
          await prisma.itemImage.create({
            data: {
              position: index + 1,
              imageUrl: a.secure_url,
              itemId: itemx.id
            }
          });
        } catch (error) {
          console.log(error);
        }
      });

      await Promise.all(uploadPromises);
      res.status(200).json({ message: `post done` });
    }
  } catch (error) {
    next(error);
  }
};

const updateItem = async (req, res, next) => {
  try {
    const {
      title,
      categories: newCategories,
      description,
      price,
      id,
      position,
      availability
    } = JSON.parse(req.body.json);

    // console.log('updateItem log:', req.body);
    const newCategoryByName = await prisma.categories.findFirst({
      where: {
        name: newCategories
      }
    });

    await prisma.item.update({
      where: {
        id: +id
      },
      data: {
        title,
        description,
        price,
        updatedAt: new Date(),
        status: availability,
        categoriesId: newCategoryByName.id
      }
    });

    if (req.files) {
      await prisma.itemImage.deleteMany({
        where: {
          itemId: +id
        }
      });
      await Promise.all(
        req.files.map(async (item, index) => {
          try {
            const a = await cloundinary.uploader.upload(item.path);
            await prisma.itemImage.create({
              data: {
                position: index + 1,
                imageUrl: a.secure_url,
                itemId: +id
              }
            });
          } catch (error) {
            console.error('there is an error: ', error);
            console.log(error);
          }
        })
      );
    }

    res.status(200).json({ msg: `done` });
  } catch (error) {
    next(error);
  }
};

const updateItemStatus = async (req, res, next) => {
  const { productId } = req.body;

  try {
    const updatedItem = await prisma.item.update({
      where: {
        id: +productId
      },
      data: {
        status: 'available'
      }
    });
    console.log('updatedItem data: ', updatedItem);
    const ownerId = updatedItem.ownerId;
    res.status(200).json({ ownerId });
  } catch (error) {
    next(error);
  }
};

const getMyProduct = async (req, res, next) => {
  const { userId } = req.query;
  try {
    const data = await prisma.item.findMany({
      where: {
        ownerId: +userId
      },
      include: {
        images: {
          select: {
            imageUrl: true,
            position: true
          }
        },
        categories: {
          select: {
            name: true
          }
        }
      }
    });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const { itemId } = req.body;
    await prisma.itemImage.deleteMany({
      where: {
        itemId: +itemId
      }
    });
    const data = await prisma.item.delete({
      where: { id: +itemId }
    });
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

const renewItem = async (req, res, next) => {
  try {
    const { id, status } = req.body;
    await prisma.item.update({
      where: { id: +id },
      data: {
        status,
        updatedAt: new Date()
      }
    });
    res.status(200).json(`done`);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { value, error } = updateUserSchema.validate(req.body);
    if (error) next(createError(`user validateError`, 400));

    const userPassword = await prisma.user.findFirst({
      where: { id: req.user.id },
      select: { password: true }
    });

    const compare = await bcrypt.compare(value.password, userPassword.password);
    if (compare) {
      if (req.file) {
        const img = await cloundinary.uploader.upload(req.file.path);
        await prisma.user.update({
          date: { profileImg: img.secure_url },
          where: { id: req.user.id }
        });
      }
      async function update(data) {
        await prisma.user.update({
          where: { id: req.user.id },
          data: { [data]: value[data] }
        });
      }
      if (value.firstName) update(`firstName`);
      if (value.lastName) update(`lastName`);
      if (value.email) update(`email`);
      if (value.phoneNumber) update(`phoneNumber`);
    }

    res.status(200).json({ x: 'done' });
  } catch (error) {
    next(error);
  }
};
const dashboard = async (req, res, next) => {
  try {
    const items = await prisma.item.findMany({
      where: { ownerId: req.user.id },
      include: {
        images: {
          select: {
            imageUrl: true,
            position: true
          }
        },
        rents: {
          select: {
            createdAt: true,
            startRentDate: true,
            endRentDate: true,
            status: true,
            amount: true,
            deposit: true,
            rentee: {
              select: {
                firstName: true,
                lastName: true,
                phoneNumber: true,
                profileImg: true,
                lastLoginAt: true
              }
            }
          }
        }
      }
    });
    const rentes = await prisma.rent.findMany({
      where: {
        renteeId: req.user.id
      },
      include: {
        item: {
          select: {
            title: true,
            description: true,
            status: true,
            price: true,
            createdAt: true,
            updatedAt: true,
            categories: {
              select: { name: true }
            }
          }
        },
        owner: {
          select: {
            firstName: true,
            lastName: true,
            phoneNumber: true,
            profileImg: true,
            lastLoginAt: true
          }
        }
      }
    });

    res.status(200).json({ data: { a: items, b: rentes } });
  } catch (error) {
    next(error);
  }
};

module.exports = { postItem, updateItem, deleteItem, renewItem, updateUser, dashboard, getMyProduct, updateItemStatus };
