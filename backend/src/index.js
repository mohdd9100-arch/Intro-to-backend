import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
import app from "./config/app.js";
import connectDB from "./config/database.js";

dotenv.config({
  path: fileURLToPath(new URL("../../.env", import.meta.url)),
}); // Load environment variables from .env file

const startServer = async () => {
  try {
    await connectDB();

    app.on("error", (error) => {
      console.log("ERROR ", error);
      throw error;
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port : ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("MongoDB connection failed!!", error);
  }
};

startServer();
