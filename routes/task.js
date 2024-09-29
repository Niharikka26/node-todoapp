import express from "express";
import { deleteTask, myTask, newTask, updatedTask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router=express.Router();

router.post("/new",isAuthenticated, newTask);
router.get("/my",isAuthenticated,myTask);
router.route("/:id").put(isAuthenticated,updatedTask).delete(isAuthenticated,deleteTask);
export default router;