import { Router } from "express";
import { createTask, deleteTask, getTaskList, updateTask} from "../controller/crudController";
import authenticateJWT from "../middleware/authMiddlware";


const router = Router();
router.post("/create-task",authenticateJWT,createTask);
router.post("/update-task",authenticateJWT,updateTask);
router.post("/delete-task",authenticateJWT,deleteTask);
router.get('/get-task-list',authenticateJWT,getTaskList)
export default router;
