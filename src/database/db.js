    import mongoose from "mongoose";
    import { DB_NAME } from "../constant.js";
    const dbconnect = async () => {
    try {
      const dbconnection = await mongoose.connect
      (`${process.env.MONGODB_URI}/${DB_NAME}`);
      console.log(`/n database connected !! host:`);
    } catch (error) {
        console.log("database connection error",error);
        process.exit(1);
    }
}

export default dbconnect