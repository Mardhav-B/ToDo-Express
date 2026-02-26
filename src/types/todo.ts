import { Document } from "mongoose";

export interface ITodo {
  name: string;
  dueDate: Date;
  completed?: boolean;
}

export interface ITodoDocument extends ITodo, Document {}

export interface IUpdateTodo {
  name?: string | undefined;
  dueDate?: Date | undefined;
  completed?: boolean | undefined;
}
