import { User } from "../model/user.js";
import jwt from "jsonwebtoken";

export const isAuthenticated= async (req,res,next)=>
{
  const {token}= req.cookies;

   if(!token)
    {
      return res.status(404).json({
        success:false,
        message: "Login First",
      });
     }
    const decoded= await jwt.verify(token,process.env.JWT_SECRET);
    // console.log(decoded);
    req.user=await User.findById(decoded._id);
    next();
}