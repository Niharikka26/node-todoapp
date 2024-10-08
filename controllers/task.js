import ErrorHandler from "../middlewares/error.js";
import { Task } from "../model/task.js";

export const newTask=async (req,res,next)=>{

  // const task=new Task({title});
  // await task.save();

  const{title , description} = req.body;

  await Task.create({
    title,
    description,
    user: req.user,
  });

  res.status(201).json({
    success:true,
    message:"Task added successfully",
  });

};

export const myTask= async(req,res,next)=>{

  const userid=req.user._id;
  const tasks=await Task.find({user: userid});

  res.status(200).json({
    success:true,
    tasks,
  });

};
export const updatedTask= async(req,res,next)=>{

  const {id}=req.params;
  const task=await Task.findById(id);

  if(!task)
    return next(new ErrorHandler("Task Not Found",404));

  task.isCompleted=!task.isCompleted;
  await task.save();
  res.status(200).json({
    success:true,
    message: "Task Updated!",
  });

};
export const deleteTask= async(req,res,next)=>{

  const {id}=req.params;
  const task=await Task.findById(id);

  if(!task)
    return next(new ErrorHandler("Task Not found",404));
    
  await task.deleteOne();

  res.status(200).json({
    success:true,
    message:"Task deleted",
  });

};

