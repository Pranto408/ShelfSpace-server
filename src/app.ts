import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import router from "./routes";
import AppError from "./lib/AppError";

const app: Application = express();

// ---------- Global Middleware ----------
app.use(
  cors({
    origin: ["http://localhost:3000", "https://shelf-space-client.vercel.app"],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------- Health check ----------
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "SCIC/EJP-13 Backend API is running",
    data: null,
  });
});

// ---------- Application Routes ----------
app.use("/api/v1", router);

// ---------- 404 handler ----------
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    data: null,
  });
});

// ---------- Global error handler ----------
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      data: null,
    });
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Something went wrong",
    data: null,
  });
});

export default app;
