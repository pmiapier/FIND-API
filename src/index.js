const express = require('express');
const app = express()
const cors = require(`cors`)
const morgan = require('morgan');


require('dotenv').config();
const PORT = process.env.PORT || '8000';


const itemRoute = require(`./routes/item-route`)
const userRoute = require(`./routes/user-route`)
const authRoute = require(`./routes/auth-route`)
const adminRoute = require(`./routes/admin-route`)
const rentRote = require(`./routes/rent_route`)
const notFound = require(`./middlewares/not-found`)
const serverError = require(`./middlewares/error`)
const rateLimitMiddleware = require(`./middlewares/rate-limit`)




app.use(morgan('dev'));
app.use(cors());
app.use(rateLimitMiddleware);
app.use(express.json());



app.use(`/auth`,authRoute)
app.use(`/item`,itemRoute)
app.use(`/user`,userRoute)
app.use(`/admin`,adminRoute)
app.use(`/rent`,rentRote)


app.use(notFound)
app.use(serverError)



app.listen(PORT, () => {
  console.log(`Server is alive on http://localhost:${PORT}`);
});






const createCategoriesList = require(`./sql/createCategories`)
// createCategoriesList()