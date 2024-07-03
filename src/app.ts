import express, { Application } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFoundErrorHanlder from "./app/middleware/notFoundErrorHandler";

const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

//routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "app is successfully running" });
});
app.use("/api", router);

//Global Error Handler
app.use(globalErrorHandler);

//not found route handler
app.use(notFoundErrorHanlder);

export default app;
