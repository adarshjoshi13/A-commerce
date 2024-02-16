var express = require('express');
const cors = require('cors');
const homecontroller = require('./src/controllers/homecontroller');
const { Connection } = require('./src/models/index')
require('dotenv').config();


const app = express();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5000",
  credentials: true,
  optionsSuccessStatus: 200
}));

Connection()

app.post('/authentication', homecontroller.Authentication);
app.post('/register', homecontroller.Register);
app.post('/login', homecontroller.Login);
app.get('/get-user-data/:userId', homecontroller.GetUserData);
app.get('/get-product-data', homecontroller.GetProductData);
app.get('/get-product/:id', homecontroller.GetProduct);
// app.post('/verify-user', homecontroller.VerifyUser);
app.post('/add-cart', homecontroller.AddCart);
app.get('/get-user-cart/:userId', homecontroller.GetUserCart);
app.post('/remove-from-cart', homecontroller.RemoveFromCart);
app.post('/add-wishlist', homecontroller.AddWishlist);
app.post('/get-user-wishlist', homecontroller.GetUserWishlist);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

