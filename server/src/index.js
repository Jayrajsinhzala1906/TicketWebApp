import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import expressValidator from "express-validator";
import "dotenv/config";
import userRouter from "./user/routes/user.js";
import ticketRouter from "./ticket/routes/ticket.js";

const app = express();

app.use(cors());
app.use(expressValidator());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, () => {
  console.log("DB connected");
});

app.use("/user", userRouter);
app.use("/ticket", ticketRouter);

app.listen(process.env.PORT || 8000, () => {
  console.log(`server is running on ${process.env.PORT}`);
});
