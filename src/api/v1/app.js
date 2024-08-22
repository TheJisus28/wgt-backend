import express from "express";
import userRouter from "./routes/user.router.js";
import { errorHandler } from "./middelwares/error.middelware.js";

const app = express();

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use(errorHandler);

export default app;
