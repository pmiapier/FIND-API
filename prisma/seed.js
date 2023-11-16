const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const faker = require('faker');

const prisma = new PrismaClient();

const hashPassword = bcrypt.hashSync('12345678', 10);

async function main() {
  // const adminUser = await prisma.user.create({
  //   data: {
  //     // id: 1,
  //     email: 'admin@gmail.com',
  //     password: hashPassword,
  //     firstName: 'Admin',
  //     lastName: 'Admin',
  //     phoneNumber: '9999999999',
  //     isVerified: true,
  //     isAdmin: true
  //   }
  // });
  // Create 5 regular users
  // const { count: regularUserCount } = await prisma.user.createMany({
  //   data: [
  //     {
  //       email: 'b@gmail.com',
  //       password: hashPassword,
  //       firstName: 'John',
  //       lastName: 'Doe',
  //       phoneNumber: '1234567890',
  //       isVerified: false,
  //       isAdmin: false
  //     },
  //     {
  //       email: 'c@gmail.com',
  //       password: hashPassword,
  //       firstName: 'Alice',
  //       lastName: 'Smith',
  //       phoneNumber: '9876543210',
  //       isVerified: false,
  //       isAdmin: false
  //     },
  //     {
  //       email: 'd@gmail.com',
  //       password: hashPassword,
  //       firstName: 'Bob',
  //       lastName: 'Johnson',
  //       phoneNumber: '5555555555',
  //       isVerified: false,
  //       isAdmin: false
  //     },
  //     {
  //       email: 'e@gmail.com',
  //       password: hashPassword,
  //       firstName: 'Eve',
  //       lastName: 'Wilson',
  //       phoneNumber: '7777777777',
  //       isVerified: false,
  //       isAdmin: false
  //     },
  //     {
  //       email: 'f@gmail.com',
  //       password: hashPassword,
  //       firstName: 'Carol',
  //       lastName: 'Brown',
  //       phoneNumber: '1111111111',
  //       isVerified: false,
  //       isAdmin: false
  //     }
  //   ]
  // });

  const categories = await prisma.categories.createMany({
    data: [
      {
        name: 'Appliances'
      },
      {
        name: 'Electronics'
      },
      {
        name: 'Vehicles'
      },
      {
        name: 'Baby'
      },
      {
        name: 'Tools'
      },
      {
        name: 'Camping'
      },
      {
        name: 'Hiking'
      },
      {
        name: 'Clothing'
      },
      {
        name: 'Sport'
      },
      {
        name: 'Book'
      }
    ]
  });

  // for (let id = 1; id <= regularUserCount + 1; id++) {
  //   await prisma.wallet.create({
  //     data: {
  //       id,
  //       userId: id,
  //       amount: 0
  //     }
  //   });
  // }

  // for (let userId = 1; userId <= regularUserCount + 1; userId++) {
  //   for (let i = 1; i <= 5; i++) {
  //     const ranCat = faker.random.number({ min: 1, max: 10 });
  //     await prisma.item.create({
  //       data: {
  //         ownerId: userId,
  //         categoriesId: ranCat,
  //         title: `Product ${i} for User ${userId}`,
  //         description: `Description of Product ${i} for User ${userId}`,
  //         status: 'available',
  //         price: i * 50,
  //         images: {
  //           create: [
  //             {
  //               imageUrl: 'https://placehold.co/2000x2000.png',
  //               position: 1
  //             }
  //           ]
  //         }
  //       }
  //     });
  //   }
  // }

  // for (let userId = 1; userId <= regularUserCount + 1; userId++) {
  //   for (let i = 1; i <= 10; i++) {
  //     const randomRentStatus = faker.random.arrayElement(['inprocess', 'renting', 'completed', 'dispute']);
  //     const rentAmount = faker.random.number({ min: 50, max: 2000 });
  //     const depositAmount = faker.random.number({ min: 20, max: 900 });

  //     // Find a random item for this rent
  //     const randomItemId = faker.random.number({ min: 1, max: 30 }); // Adjust the range as needed

  //     // Find the item by its ID
  //     const item = await prisma.item.findUnique({
  //       where: { id: randomItemId }
  //     });

  //     if (item) {
  //       const randomRenteeId = faker.random.number({ min: 1, max: 6 });
  //       const randomOwnerId = faker.random.number({ min: 1, max: 6 });
  //       const randomStripeSession = (Math.random() + 1).toString(36).substring(7);
  //       const rent = await prisma.rent.create({
  //         data: {
  //           ownerId: randomOwnerId,
  //           renteeId: randomRenteeId,
  //           itemId: item.id,
  //           startRentDate: new Date(),
  //           endRentDate: new Date(),
  //           status: randomRentStatus,
  //           amount: rentAmount,
  //           deposit: depositAmount,
  //           stripeSession: randomStripeSession
  //         }
  //       });

  //       await prisma.transaction.create({
  //         data: {
  //           walletId: userId,
  //           rentId: rent.id,
  //           amount: rentAmount
  //         }
  //       });
  //     }
  //   }
  // }

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
