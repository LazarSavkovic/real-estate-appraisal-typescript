//IMPORT MONGOOSE
import mongoose from "mongoose"

// CONNECTING TO MONGOOSE (Get Database Url from .env.local)
const { NEXT_MONGO_URL } = process.env

// connection function
export const connect = async () => {
  const conn = await mongoose
    .connect(NEXT_MONGO_URL as string)
    .catch(err => console.log(err))
  console.log("Mongoose Connection Established")

  return conn

}