const express = require("express");
const app = express();
const cors = require(`cors`);
const morgan = require("morgan");

require("dotenv").config();
const PORT = process.env.PORT || "8000";

const itemRoute = require(`./routes/item-route`);
const userRoute = require(`./routes/user-route`);
const authRoute = require(`./routes/auth-route`);
const adminRoute = require(`./routes/admin-route`);
const rentRote = require(`./routes/rent_route`);
const transactionRote = require(`./routes/transaction-route`);
const wallet = require(`./routes/wallet-route`);
const notFound = require(`./middlewares/not-found`);
const serverError = require(`./middlewares/error`);
const rateLimitMiddleware = require(`./middlewares/rate-limit`);


//# TEE
const createCheckoutSession = require("./payment/checkout");
//#####
const {orderTemplate} = require(`./middlewares/emailNotificationTemplate`)


app.use(morgan("dev"));
app.use(cors());
app.use(rateLimitMiddleware);
app.use(express.json());
app.set(`view engine`,`pug`)

//# TEE
app.get("/", (req, res) => res.send("Welcome to FIND"));
app.post("/create-checkout-session", createCheckoutSession);
//#####

// test
app.get(`/test`,orderTemplate)
// test

app.use(`/auth`, authRoute);
app.use(`/item`, itemRoute);
app.use(`/user`, userRoute);
app.use(`/admin`, adminRoute);
app.use(`/rent`, rentRote);
app.use(`/transaction`, transactionRote);
app.use(`/wallet`, wallet);


app.use(notFound);
app.use(serverError);

app.listen(8000, () => {
  console.log(`Server is alive on http://localhost:${PORT}`);
});
