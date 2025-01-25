import mongoose from "mongoose";
import {DB_NAME} from "../constant.js";
async function dbconnect(){
  try{
    const result = await mongoose.connect
    (`${process.env.MONGODB_URI}/${DB_NAME}`)
    console.log(`\n mongodb connected at ${result.connection.host}`)
  }
  catch(err){
    console.log(err)
  }
}
export default dbconnect
