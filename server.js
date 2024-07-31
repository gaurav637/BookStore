require("dotenv").config();
const express = require('express');
const router = require('./routes');
const connectDB = require('./configuration/DB.js');
connectDB();

const app = express();
app.use(express.json());
app.use('/api',router);


const PORT = process.env.PORT||6060;
app.listen(PORT , ()=> {
    console.log(`server is runnong at ${PORT} `);
})