var express = require('express');
const cors = require('cors');
const BuyerController = require('./src/controllers/BuyerController');
const BuyerHomeController = require('./src/controllers/BuyerHomeController');
const SellerController = require('./src/controllers/SellerController');
const SellerHomeController = require('./src/controllers/SellerHomeController');
const { Connection } = require('./src/models/index')
const multer = require('multer');
const upload = multer({dest: 'uploads/'})
require('dotenv').config();

const app = express();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5000",
  credentials: true,
  optionsSuccessStatus: 200
}));

Connection()

app.get('/', (req, res)=> {
  res.send('A commerce Backend')
})
app.post('/buyer-authentication', BuyerController.BuyerAuthentication);
app.post('/buyer-sign-up', BuyerController.BuyerRegister);
app.post('/buyer-sign-in', BuyerController.BuyerLogin);
app.get('/get-user-data/:BuyerId', BuyerController.GetUserData);
// app.post('/verify-user', BuyerController.VerifyUser);
app.get('/get-products/:catId', BuyerHomeController.GetProductData);
app.get('/get-product/:id', BuyerHomeController.GetProduct);
app.post('/add-to-cart', BuyerHomeController.AddCart);
app.get('/get-user-cart/:BuyerId', BuyerHomeController.GetUserCart);
app.post('/remove-from-cart', BuyerHomeController.RemoveFromCart);
app.post('/add-wishlist', BuyerHomeController.AddWishlist);
app.get('/get-user-wishlist/:BuyerId', BuyerHomeController.GetUserWishlist);
app.post('/remove-from-wishlist', BuyerHomeController.RemoveFromWishlist);
app.get('/get-categories', BuyerHomeController.GetCategories);
app.get('/get-purchase-form', BuyerHomeController.GetPurchaseSteps);
app.post('/list-product-order', BuyerHomeController.ListProductOrder);
app.get('/get-user-orders/:BuyerId', BuyerHomeController.GetUserOrders);
app.post('/cancel-order', BuyerHomeController.CancelOrder);
app.get('/get-search-result/:searchedKey', BuyerHomeController.GetRelatedSearchSuggestion);
app.get('/get-searched-products/:searchedKey', BuyerHomeController.GetSearchedProducts);
app.get('/get-filter-products', BuyerHomeController.GetFilterProducts);

// Seller API
app.post('/seller-sign-up', SellerController.SellerRegister);
app.put('/verify-seller/:verificationToken', SellerController.VerifyUser);
app.post('/seller-sign-in', SellerController.SellerLogin);
app.get('/get-seller-info/:SellerId', SellerHomeController.SellerInfo);
app.post('/add-product', upload.array('productPhoto', Infinity), SellerHomeController.AddProduct)
app.get('/get-listed-products', SellerHomeController.GetListedProducts)
app.post('/remove-product-from-list', SellerHomeController.RemoveFromProductList)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

