import { Request, Response } from "express";
import { z } from "zod";
import {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  patchTodo,
  deleteTodo,
} from "../services/todoService";

const createTodoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  dueDate: z
    .string()
    .datetime()
    .or(z.date())
    .transform((val) => new Date(val)),
  completed: z.boolean().default(false),
});

const updateTodoSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  dueDate: z
    .string()
    .datetime()
    .or(z.date())
    .transform((val) => new Date(val))
    .optional(),
  completed: z.boolean().optional(),
});

export const createTodoHandler = async (req: Request, res: Response) => {
  const parsed = createTodoSchema.parse(req.body);

  const todo = await createTodo(parsed);

  res.status(201).json({
    success: true,
    data: todo,
  });
};

export const getTodosHandler = async (_req: Request, res: Response) => {
  const todos = await getAllTodos();

  res.status(200).json({
    success: true,
    data: todos,
  });
};

export const getTodoHandler = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Todo ID is required",
    });
  }

  const todo = await getTodoById(id);

  if (!todo) {
    return res.status(404).json({
      success: false,
      message: "Todo not found",
    });
  }

  res.status(200).json({
    success: true,
    data: todo,
  });
};

export const updateTodoHandler = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Todo ID is required",
    });
  }

  const parsed = updateTodoSchema.parse(req.body);

  const todo = await updateTodo(id, parsed);

  if (!todo) {
    return res.status(404).json({
      success: false,
      message: "Todo not found",
    });
  }

  res.status(200).json({
    success: true,
    data: todo,
  });
};

export const patchTodoHandler = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Todo ID is required",
    });
  }

  const parsed = updateTodoSchema.parse(req.body);

  const todo = await patchTodo(id, parsed);

  if (!todo) {
    return res.status(404).json({
      success: false,
      message: "Todo not found",
    });
  }

  res.status(200).json({
    success: true,
    data: todo,
  });
};

export const deleteTodoHandler = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Todo ID is required",
    });
  }

  const todo = await deleteTodo(id);

  if (!todo) {
    return res.status(404).json({
      success: false,
      message: "Todo not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Todo deleted successfully",
    data: todo,
  });
};
