import { User } from "../model/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/feature.js";
import ErrorHandler from "../middlewares/error.js";

// export const getAllUsers=async (req,res)=>{

//   const users=await User.find({});

//   const keyword=req.query.keyword;
//   console.log(keyword);
//   res.json({
//     success:true,
//     users,
//   })};

  export const  Registered  =async (req,res,next)=>{
      try {
        const {name,email,password}= req.body;
     let user=await User.findOne({email});
     if(user)
      return next(new ErrorHandler("User already exist",400));
  
    //  if(user)
    //  {
    //   return res.status(404).json({
    //     success:false,
    //     message: "User already exist",
    //   })
    //  }

    const hashedPassword= await bcrypt.hash(password,10);

   user=await User.create({
    name,
    email,
    password: hashedPassword,
   });

   sendCookie(user,res,"Registered successfully",201);
      } catch (error) {
        next(error);
      }
  };


  // export const special=(req,res)=>{
  //   res.json({
  //    success:true,
  //    message:"Just Joking",
  //   });
  // };
 export const login= async(req,res,next)=>{

   try {
    const {email,password}= req.body;
    let user= await User.findOne({email}).select("+password");
  
    if(!user)
      return next(new ErrorHandler("Invalid email or password",400));
    // if(!user)
    // {
    //   return res.status(404).json({
    //     success:false,
    //     message: "Invalid email or password",
    //   }) ;
    // }
  
    const isMatch= await bcrypt.compare(password, user.password);
  
    if(!isMatch)
      return next(new ErrorHandler("Invalid email or password",400));
    // if(!isMatch)
    // {
    //   return res.status(404).json({
    //     success:false,
    //     message: "Invalid email or password",
    //   }) ;
    // }
  
    sendCookie(user,res,`Welcome back, ${user.name}`,200);
  
    
   } catch (error) {
    next(error);
   }

 };

  export const getMyProfile =(req,res)=>{
    res.json({
         success:true,
         user:req.user,
        });
  };

  export const logout=(req,res)=>{
   res.status(200).cookie("token"," ",{
    expires: new Date(Date.now()),
    sameSite: process.env.NODE_ENV==="Development"? "lax":"none",
    secure: process.env.NODE_ENV==="Development"? false:true,
   }).json({
      success:true,
      user: req.user,
    }) ;
  };

  // export const UpdateUser =async(req,res)=>{
  //   const { id }=  req.params;
  //   const user = await User.findById(id);
  //   res.json({
  //    success:true,
  //    message:"Updated",
  //   });
  // }

  // export const deleteuser =async(req,res)=>{
  //   const { id }=  req.params;
  //   const user = await User.findById(id);
  //   // await user.remove();
  //   res.json({
  //    success:true,
  //    message:"Deleted",
  //   });
  // }

  
