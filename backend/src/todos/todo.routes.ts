import { Router } from "express";
import {
  createTodoHandler,
  deleteTodoHandler,
  getAllTodosHandler,
  getTodoByIdHandler,
  updateTodoHandler,
} from "./todo.controller.ts";

const router = Router();

router.post("/todos", createTodoHandler);
router.get("/todos", getAllTodosHandler);
router.get("/todos/:id", getTodoByIdHandler);
router.put("/todos/:id", updateTodoHandler);
router.delete("/todos/:id", deleteTodoHandler);

export default router;
