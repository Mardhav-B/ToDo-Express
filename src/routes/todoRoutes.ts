import { Router } from "express";
import {
  createTodoHandler,
  getTodosHandler,
  getTodoHandler,
  updateTodoHandler,
  patchTodoHandler,
  deleteTodoHandler,
} from "../controllers/todoController";

const router = Router();

router.post("/", createTodoHandler);
router.delete("/:id", deleteTodoHandler);
router.get("/", getTodosHandler);
router.get("/:id", getTodoHandler);
router.put("/:id", updateTodoHandler);
router.patch("/:id", patchTodoHandler);
export default router;
