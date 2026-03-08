import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./Routes/authRoutes.js";
import blogRoutes from "./Routes/blogRoutes.js"
import { fileURLToPath } from "url";
import path from "path";
dotenv.config();
export const app = express();


app.use(express.json());

app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||                                
        origin.endsWith(".vercel.app") ||         
        origin === "http://localhost:5173"       
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "Backend is working fine 🚀" });
});


app.use('/uploads', express.static('uploads'));
app.use("/api", router);
app.use("/api/blogs", blogRoutes);



app.use((req, res) => res.status(404).json({message: "Not found"}));