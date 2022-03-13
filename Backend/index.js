const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const user = require('./routes/user');
const auth = require('./routes/auth');
const product = require('./routes/product');
const cart = require('./routes/cart');
const order = require('./routes/order');
const stripe = require('./routes/stripe');
const cors = require("cors")


//initialize dotenv to hide secret keys
dotenv.config();

//initialize app
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

//routes
app.use("/api/auth", auth);
app.use("/api/users", user);
app.use("/api/products", product);
app.use("/api/cart", cart);
app.use("/api/orders", order);
app.use("/api/stripe", stripe);

mongoose
    .connect(process.env.MONGO_KEY)
    .then(() => console.log("DB  connection successful"))
    .catch((error) => console.log(error));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`sever listening on port ${PORT}`));   
