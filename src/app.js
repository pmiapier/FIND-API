const express = require('express');
const app = express()
const cors = require(`cors`)

require('dotenv').config();
const PORT = process.env.PORT || '8000';




const dataRoute = require(`./route/data-route`)
const userRoute = require(`./route/user-route`)
const authRoute = require(`./route/auth-route`)
const adminRoute = require(`./route/admin-route`)
const notFound = require(`./middlewares/not-found`)
const serverError = require(`./middlewares/error`)



app.use(cors());
app.use(express.json());




app.use(`/auth`,authRoute)
app.use(`/data`,dataRoute)
app.use(`/user`,userRoute)
app.use(`/admin`,adminRoute)



app.use(notFound)
app.use(serverError)



app.listen(PORT, () => {
  console.log(`Server is alive on http://localhost:${PORT}`);
});
