import { Schema, model } from "mongoose";
import { ITodo, ITodoDocument, IUpdateTodo } from "../types/todo";
import Todo from "../model/todomodel";

export const createTodo = async (data: ITodo) => {
  return Todo.create(data);
};

export const getAllTodos = async () => {
  return Todo.find().sort({ createdAt: -1 });
};

export const getTodoById = async (id: string) => {
  return Todo.findById(id);
};

export const updateTodo = async (id: string, data: IUpdateTodo) => {
  return Todo.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

export const patchTodo = async (id: string, data: IUpdateTodo) => {
  return Todo.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true },
  );
};

export const deleteTodo = async (id: string) => {
  return Todo.findByIdAndDelete(id);
};
