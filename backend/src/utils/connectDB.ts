import { connect } from "mongoose";
export async function connectDB() {
  try {
    await connect("mongodb://127.0.0.1:27017/collaboration-app");
    console.log("connected")
  } catch (error) {
    console.log(error);
  }
}
