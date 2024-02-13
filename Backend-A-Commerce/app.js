var express = require('express');
const cors = require('cors');
const { ProcessSession } = require('./utilis/server')
const homecontroller = require('./src/controllers/homecontroller');
const { Connection } = require('./src/models/index')
require('dotenv').config();


const app = express();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5000"
}));

app.use(ProcessSession);

Connection()

app.get('/surety', (req, res) => {
  console.log(req.session, "messege")
  res.send(req.session.msg)
  res.end()
})
app.post('/authentication', homecontroller.Authentication);
app.post('/register', homecontroller.Register);
app.post('/login', homecontroller.Login);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

