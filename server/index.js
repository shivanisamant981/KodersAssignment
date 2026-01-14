const express=require("express");
const connectDB = require("./config/db");

const app=express();
require('dotenv').config();
app.use(express.json())


app.get("/",(req,res)=>{
    res.send("hello ");
})

connectDB();




app.listen(process.env.PORT,()=>{
    console.log(`running...${process.env.PORT}`)
})