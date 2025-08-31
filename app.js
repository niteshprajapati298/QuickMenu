const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const app = express();
app.use(express.json());
const cookieParser = require('cookie-parser');
const ownerRoutes = require('./src/routes/owner.routes');
app.use(cookieParser());
app.use(cors());
app.use('/owner',ownerRoutes);
app.use('/',(req,res)=>{
    res.send("Hello world")
})

module.exports = app;

