// app.js
var express = require('express');
const cors = require('cors');
const homecontroller = require('./src/controllers/homecontroller'); 
const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 200
}));

app.post('/authentication', homecontroller.Authentication);


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
