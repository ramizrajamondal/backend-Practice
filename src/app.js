import dotenv from "dotenv"
import dbconnect from "./database/db.js";
dotenv.config({
    path: "./env"
})
dbconnect()
