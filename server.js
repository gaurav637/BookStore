require("dotenv").config();
const express = require('express');
const router = require('./routes');

const app = express();
app.use('./api',router);
app.get('/' , (req,res) => {
    res.send("server is running port ");
})

const PORT = process.env.PORT||6060;
app.listen(PORT , ()=> {
    console.log(`server is runnong at ${PORT} `);
})