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
router.get("/",async(req,res)=>{
    try{
        const tasks=await Task.find().sort({createdAt:-1});
        res.status(200).json(tasks);

    }catch(error){
        res.status(500).json({
            messagr:"Server error",
            error:error.message,
        })
    }
})
router.delete("/delete/:id",async(req,res)=>{
    try{
        const deleteTask=await Task.findByIdAndDelete(req.params.id);

        if(!deleteTask){
            return res.status(404).json({message:"task not found"});
        }
        res.status(200).json({message:"task deleted successfully"});
    }catch(error){
        res.status(500).json({
            messsage:"server error",
            error:error.message
        })
    }
})

router.put("/update/:id",async(req,res)=>{
    try{
            const {title,description,status}=req.body;

            const updatedTask= await Task.findByIdAndUpdate(
                req.params.id,
                {title,description,status},
                {new:true,runValidation:true}
            )
            if(!updatedTask){
                return res.status(404).json({message:"Task not found"});
            }
            res.status(200).json(updatedTask);
    }
    catch(error){
        res.status(500).json({
            messagee:"Server error",
            error:error.message,
        });
    }
})
router.patch("/:id/toggle",async(req,res)=>{
    try{
        const task=await Task.findById(req.params.id);
        if(!task){
            return res.status(404).json({"message":"task not found"});
        }
        task.status=task.status==="Pending"?"Completed":"Pending";
        await task.save();
        res.status(200).json(task);

    }catch(error){
        res.status(500).json({
            message:"Server error",
            error:error.message,
        })
    }
})

module.exports=router
