const express = require("express");
const app = express();
const cors = require(`cors`);
const morgan = require("morgan");
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
require('./socket-io')(io);

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

app.use(morgan("dev"));
app.use(cors());
app.use(rateLimitMiddleware);
app.use(express.json());

//# TEE
app.get("/", (req, res) => res.send("Welcome to FIND"));
app.post("/create-checkout-session", createCheckoutSession);
//#####

app.use(`/auth`, authRoute);
app.use(`/item`, itemRoute);
app.use(`/user`, userRoute);
app.use(`/admin`, adminRoute);
app.use(`/rent`, rentRote);
app.use(`/transaction`, transactionRote);
app.use(`/wallet`, wallet);


app.use(notFound);
app.use(serverError);

server.listen(8000, () => {
  console.log(`Server is alive on http://localhost:${PORT}`);
});
