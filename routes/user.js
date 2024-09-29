import express from "express";
// import { User } from "../model/user.js";
import { Registered,login, logout,getMyProfile } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router=express.Router();

router.get("/",(req,res)=>{
  res.send("Nice Working");
});

router.post("/login",login);
router.post("/new",Registered);

// router.get("/userid/special",special);

router.get("/me",isAuthenticated,getMyProfile);
router.get("/logout",logout);
// .put(UpdateUser).delete(deleteuser);


export default router;