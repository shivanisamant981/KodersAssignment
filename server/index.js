const express=require("express");
const connectDB = require("./config/db");
const taskRouter=require("./routes/taskRoutes.js")

const app=express();
require('dotenv').config();
app.use(express.json())


app.use("/api/tasks",taskRouter);

connectDB();


app.listen(process.env.PORT,()=>{
    console.log(`running...${process.env.PORT}`)
})