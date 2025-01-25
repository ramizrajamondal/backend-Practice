import express from "express";
const app = express();
import cors from "cros";
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    Credential: true,
}))
app.use(express.json({limit: "10kb"}))
app.use(express.urlencoded({extends: true, limit: "10kb"}))
app.use(express.static("public"))
export default app
