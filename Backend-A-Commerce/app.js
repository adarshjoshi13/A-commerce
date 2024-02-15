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
app.get('/get-data', homecontroller.GetProductData);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

