import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import userRouter from "./routes/user.js";
import ticketRouter from "./routes/ticket.js";

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, () => {
  console.log("DB connected");
});

app.use("/user", userRouter);
app.use("/ticket", ticketRouter);

app.listen(8000, () => {
  console.log("server is running on 8000");
});
