const mongoose=require("mongoose");

const taskSchema=new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            trim:true,
            minlength:3,
        },
        description:{
            type:String,
            required:true,
            trim:true,
            minlength:5,
        },
        status:{
            type:String,
            enum:["Pending","completed"],
            default:"Pending",
        },

    },
    {timestamps:true}
);
const Task=mongoose.model("Task",taskSchema)
module.exports=Task;