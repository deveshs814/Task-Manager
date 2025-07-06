const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser")
require("dotenv").config();
const connectDB = require("./config/database")
const userApis = require("./controllers/user")
const taskApis = require("./controllers/task")
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true,
}));
app.get("/",(req,res) =>{
    res.send("Hello from backend!!")
})

app.use("/api/v1" , userApis);
app.use("/api/v1" , taskApis);
connectDB();
app.listen(`${process.env.PORT}`,(req,res) =>{
    console.log(`Server started and is running at : ${process.env.PORT}`)
})
