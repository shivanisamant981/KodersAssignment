const express=require("express");
const Task=require("../models/task.js")

const router=express.Router();


router.post("/",async(req,res)=>{
    try{
        const{title,description}=req.body;

        if(!title || !description){
            return res.status(400).json({message:"title and description are required"})
        }
        const newTask=await Task.create({
            title,
            description
        })
        res.status(201).json(newTask);

    }catch(error){
        res.status(500).json({message:error.message})
    }
    
});

module.exports=router
