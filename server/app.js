const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = require("./config/database")
const userApis = require("./controllers/user")

app.use(express.json());
app.use(cors());
app.get("/",(req,res) =>{
    res.send("Hello from backend!!")
})

app.use("/api/v1" , userApis);

connectDB();
app.listen(`${process.env.PORT}`,(req,res) =>{
    console.log(`Server started and is running at : ${process.env.PORT}`)
})
