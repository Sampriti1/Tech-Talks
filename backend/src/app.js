import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./Routes/authRoutes.js";
import blogRoutes from "./Routes/blogRoutes.js"
import { fileURLToPath } from "url";
import path from "path";
dotenv.config();
export const app = express();

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);
//const frontendBuildPath = path.join(__dirname, "..", "frontend", "build");
app.use(express.json());
//console.log("CLIENT_ORIGIN:", process.env.CLIENT_ORIGIN);
app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||                                // allow server-to-server or local tools
        origin.endsWith(".vercel.app") ||         // allow all vercel subdomains
        origin === "http://localhost:5173"        // allow local dev
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);



app.get("/api/health", (_, res) => res.json({ ok: true}));
app.use('/uploads', express.static('uploads'));
app.use("/api", router);
app.use("/api/blogs", blogRoutes);
//app.use(express.static(frontendBuildPath));

//app.get('*', (req, res) => {
  //  res.sendFile(path.join(frontendBuildPath, "index.html"));
//});


app.use((req, res) => res.status(404).json({message: "Not found"}));