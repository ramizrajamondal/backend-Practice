import express from "express";
const app = express();
// import cors from "cros";
// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     Credential: true,
// }))
app.use(express.json({limit: "10kb"}))
app.use(express.urlencoded({extended: true, limit: "10kb"}))
app.use(express.static("public"))

// import router
import userRouter from "./routes/user.route.js"
// use router
app.use("/api/v1/user", userRouter)

export default app
