const prisma = require(`../models/prisma`);

const getAllItem = async (req, res, next) => {
  // console.log(`ok`);
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

const getSingleItem = async (req, res, next) => {
  try {
    // const id = +req.body.id; // Assuming the item ID is in the URL as a route parameter
    const { id } = req.params;
    // console.log(req);
    const data = await prisma.item.findFirst({
      where: { id: +id },
      include: {
        images: true, // Include the associated images
        categories: true
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
    res.status(404).json({ message: 'nothing here ..' });
    console.log(error);
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
      orderBy: {
        createdAt: 'desc'
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
      orderBy: {
        createdAt: 'desc' // assuming 'createdAt' is the field name
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

const productListing = async (req, res, next) => {
  try {
    if (req.user) {
      const query = req.query;
      let page = query.page ? query.page : 1;
      let count;
      let idx = undefined;
      if (query?.categories) {
        idx = await prisma.categories.findFirst({
          where: {
            name: query?.categories
          }
        });
        count = await prisma.item.aggregate({
          _count: {
            id: true
          },
          where: {
            status: 'available',
            categoriesId: idx.id,
            ownerId: {
              not: req.user.id
            }
          }
        });
      } else {
        count = await prisma.item.aggregate({
          _count: {
            id: true
          },
          where: {
            status: 'available',
            ownerId: {
              not: req.user.id
            }
          }
        });
      }
      let where;
      if (query?.categories) {
        where = {
          categoriesId: idx.id,
          ownerId: {
            not: req.user.id
          }
        };
      } else {
        where = {
          ownerId: {
            not: req.user.id
          }
        };
      }
      const item = await prisma.item.findMany({
        include: {
          categories: true,
          images: {
            select: {
              imageUrl: true
            }
          }
        },
        where,
        take: 15,
        skip: (page - 1) * 15
      });
      res.status(200).json({ count, item });
    } else {
      const query = req.query;

      let page = query.page ? query.page : 1;

      let count;
      if (query?.categories) {
        const idx = await prisma.categories.findFirst({
          where: {
            name: query?.categories
          }
        });

        count = await prisma.item.aggregate({
          _count: {
            id: true
          },
          where: {
            status: 'available',
            categoriesId: idx.id
          }
        });
      } else {
        count = await prisma.item.aggregate({
          _count: {
            id: true
          },
          where: {
            status: 'available'
          }
        });
      }

      const whereCondition = {};

      if (query?.categories) {
        whereCondition.categories = { name: query?.categories };
      }

      const item = await prisma.item.findMany({
        include: {
          categories: true,
          images: {
            select: {
              imageUrl: true
            }
          }
        },
        where: whereCondition,
        take: 15,
        skip: (page - 1) * 15
      });

      res.status(200).json({ count, item });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllItem, getSingleItem, getCategories, myRentalItem, myRentedItem, productListing };
