var express = require('express');
const cors = require('cors');
const homecontroller = require('./src/controllers/homecontroller');
const usercontroller = require('./src/controllers/usercontroller');
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

app.post('/authentication', usercontroller.Authentication);
app.post('/register', usercontroller.Register);
app.post('/login', usercontroller.Login);
app.get('/get-user-data/:userId', usercontroller.GetUserData);
// app.post('/verify-user', usercontroller.VerifyUser);
app.get('/get-products/:catId', homecontroller.GetProductData);
app.get('/get-product/:id', homecontroller.GetProduct);
app.post('/add-cart', homecontroller.AddCart);
app.get('/get-user-cart/:userId', homecontroller.GetUserCart);
app.post('/remove-from-cart', homecontroller.RemoveFromCart);
app.post('/add-wishlist', homecontroller.AddWishlist);
app.get('/get-user-wishlist/:userId', homecontroller.GetUserWishlist);
app.post('/remove-from-wishlist', homecontroller.RemoveFromWishlist);
app.get('/get-categories', homecontroller.GetCategories);
app.get('/get-purchase-form', homecontroller.GetPurchaseSteps);
app.post('/list-product-order', homecontroller.ListProductOrder);
app.get('/get-user-orders/:userId', homecontroller.GetUserOrders);
app.post('/cancel-order', homecontroller.CancelOrder);
app.get('/get-search-result/:searchedKey', homecontroller.GetRelatedSearchSuggestion);
app.get('/get-searched-products/:searchedKey', homecontroller.GetSearchedProducts);
app.get('/get-filter-products', homecontroller.GetFilterProducts);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

