var express = require('express');
const cors = require('cors');
const homecontroller = require('./src/controllers/homecontroller');
const { Connection } = require('./dbconfig/db')
require('dotenv').config();
const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 200
}));

app.post('/authentication', homecontroller.Authentication);

Connection()

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});





