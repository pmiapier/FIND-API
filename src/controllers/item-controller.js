const prisma = require(`../models/prisma`);

const getAllItem = async (req, res, next) => {
  console.log(`ok`);
  try {
    const data = await prisma.item.findMany({
      include: {
        images: true
      }
    });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

// const getSingleItem = async (req, res, next) => {
//   try {
//     const id = req.body.id;
//     // we want to join the owner user data
//     const data = await prisma.item.findUnique({
//       where: { id: +id }
//     });

//     const user = await prisma.user.findUnique({
//       where: { id: data.ownerId }
//     });

//     data.user = user.firstName + ' ' + user.lastName.slice(0, 1);
//     res.status(200).json(data);
//   } catch (error) {
//     next(error);
//   }
// };

const getSingleItem = async (req, res, next) => {
  try {
    const id = +req.body.id; // Assuming the item ID is in the URL as a route parameter

    const data = await prisma.item.findFirst({
      where: { id: +id },
      include: {
        images: true // Include the associated images
      }
    });

    if (!data) {
      return res.status(404).json({ error: 'Item not found' });
    }

    const user = await prisma.user.findUnique({
      where: { id: data.ownerId }
    });

    data.user = user.firstName + ' ' + user.lastName.slice(0, 1);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const data = await prisma.categories.findMany({});
    const categories = [];
    data.map((item, index) => {
      categories.push(item.name);
    });

    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

const myRentalItem = async (req, res, next) => {
  try {
    const rent = await prisma.rent.findMany({
      where: {
        ownerId: req.user.id
      },
      include: {
        item: {
          select: {
            id: true,
            title: true,
            description: true,
            status: true,
            price: true,
            images: true
          }
        },
        owner: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        }
      }
    });
    res.status(200).json(rent);
    // res.status(200).send(1234)
  } catch (error) {
    next(error);
  }
};

const myRentedItem = async (req, res, next) => {
  try {
    const data = await prisma.rent.findMany({
      where: {
        renteeId: req.user.id
      },
      include: {
        item: {
          select: {
            id: true,
            title: true,
            description: true,
            status: true,
            price: true,
            images: true
          }
        },
        owner: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        }
      }
    });

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllItem, getSingleItem, getCategories, myRentalItem, myRentedItem };
