import express, { Request, Response } from "express";
import cors from "cors";
const app = express();
import userRoutes from "./routes/user.routes";
import repoRoutes from "./routes/repo.routes";
import { connectDB } from "./utils/connectDB";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 5000;

connectDB();
app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);
app.use("/repo", repoRoutes);
app.get("/health", (req: Request, res: Response) => {
  res.send("App working fine!");
});

app.listen(port, () => {
  console.log("listening");
});
