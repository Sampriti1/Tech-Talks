import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./Routes/authRoutes.js";
import blogRoutes from "./Routes/blogRoutes.js"
import { fileURLToPath } from "url";
import path from "path";
dotenv.config();
export const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());

app.use(
    cors({
        origin: process.env.CLIENT_ORIGIN,
        credentials: true
    })
)

app.get("/api/health", (_, res) => res.json({ ok: true}));
app.use('/uploads', express.static('uploads'));
app.use("/api", router);
app.use("/api/blogs", blogRoutes);
app.use(express.static(path.join(__dirname, "frontend", "build")));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});


app.use((req, res) => res.status(404).json({message: "Not found"}));