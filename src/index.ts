import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes";
import { errorMiddleware } from "./middlewares/errorMiddleware";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/todos", todoRoutes);
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

const mongooseOptions = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 5000,
};

mongoose
  .connect(process.env.MONGO_URI as string, mongooseOptions)
  .then(() => {
    console.log("MongoDB Connected");
    startServer();
  })
  .catch((err) => {
    console.error("DB Connection Error:", err.message);
    process.exit(1);
  });

function startServer() {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
