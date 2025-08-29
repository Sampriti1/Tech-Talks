import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./Routes/authRoutes.js";
import blogRoutes from "./Routes/blogRoutes.js"
dotenv.config();
export const app = express();

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


app.use((req, res) => res.status(404).json({message: "Not found"}));