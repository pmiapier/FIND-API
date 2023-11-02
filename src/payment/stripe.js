const Stripe = require("stripe");
const stripeAPI = new Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = stripeAPI;
