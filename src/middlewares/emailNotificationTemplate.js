require(`dotenv`).config();
const { RESEND_TOKEN } = process.env;
const { Resend } = require(`resend`);
const moment = require('moment');
const prisma = require(`../models/prisma`);

const registerTemplate = async (req, res, next) => {
  try {
    const user = req.user;
    console.log(user.email);

    res.render(
      `./register`,
      {
        name: `${user.firstName} ${user.lastName}`
      },
      async (err, html) => {
        if (err) {
          return next(err);
        }

        const resend = new Resend(RESEND_TOKEN);
        await resend.emails.send({
          // to: ['supawit.chukiat@gmail.com'],
          to: [user.email],
          from: 'onboarding@resend.dev',
          html: html,
          text: `This is TEXT`,
          subject: 'THIS IS SUBJECT'
        });
      }
    );
  } catch (error) {
    next(error);
  }
};

const orderTemplate = async (req, res, next) => {
  try {
    console.log(`orderTemplaate`);
    const session_id = req.session;
    // const session_id = 'totku'
    const rent = await prisma.rent.findFirst({
      where: { stripeSession: session_id },
      include: {
        rentee: {
          select: {
            email: true,
            firstName: true,
            lastName: true
          }
        },
        item: {
          select: {
            images: {
              select: {
                imageUrl: true
              }
            },
            description: true,
            price: true
          }
        }
      }
    });

    res.render(
      `./order`,
      {
        name: `${rent.rentee.firstName} ${rent.rentee.lastName}`,
        email: rent.rentee.email,
        date: moment(rent.createdAt).format('MMMM Do yyyy, h:mm:ss a'),
        img: rent.item.images[0].imageUrl,
        // description:rent.item.description,
        start: moment(rent.startRentDate).format('MMMM Do yyyy'),
        end: moment(rent.endRentDate).format('MMMM Do yyyy'),
        perday: rent.item.price,
        time: Math.floor((new Date(rent.endRentDate) - new Date(rent.startRentDate)) / (1000 * 60 * 60 * 24)) + 1
      },
      async (err, html) => {
        if (err) {
          return next(err);
        }

        const resend = new Resend(RESEND_TOKEN);
        await resend.emails.send({
          to: ['supawit.chukiat@gmail.com'],
          // "to": [`${user.email}`],
          from: 'onboarding@resend.dev',
          html: html,
          text: `This is TEXT`,
          subject: 'THIS IS SUBJECT'
        });
      }
    );
  } catch (error) {
    next(error);
  }
};

const withdrawTemplate = async (req, res, next) => {
  try {
    const walletId = req.wallet.id;
    const data = await prisma.wallet.findFirst({
      where: {
        id: walletId
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      }
    });

    res.render(
      `./withdraw`,
      {
        name: `${data.user.firstName} ${data.user.lastName}`,
        amount: data.amount,
        date: moment(data.updatedAt).format('MMMM Do yyyy, h:mm:ss a')
      },
      async (err, html) => {
        if (err) {
          return next(err);
        }

        const resend = new Resend(RESEND_TOKEN);
        await resend.emails.send({
          to: ['supawit.chukiat@gmail.com'],
          // "to": [`${user.email}`],
          from: 'onboarding@resend.dev',
          html: html,
          text: `This is TEXT`,
          subject: 'THIS IS SUBJECT'
        });
      }
    );
  } catch (error) {
    next(error);
  }
};

module.exports = { registerTemplate, orderTemplate, withdrawTemplate };
