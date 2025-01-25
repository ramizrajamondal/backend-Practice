import dotenv  from "dotenv";
import dbconnect from "./database/db.js";
import {app} from "./app.js"
dotenv.config({
    path: "./env"
})
dbconnect()
.then(()=>{
    app.listen(process.env.PORT || 3000);
    console.log("app is running");
})
.catch((err) => {
    console.log("data base err",err);
})
