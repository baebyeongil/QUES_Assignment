import express from "express";
import connector from "./db/db.js";
import dotenv from "dotenv";

dotenv.config();

export class App {
  constructor() {
    this.app = express();
  }

  runServer = async () => {
    try {
      this.app.listen(process.env.PORT, function () {
        console.log("✨".repeat(17));
        console.log(`✨✨ Server Run,  Port : ${process.env.PORT} ✨✨`);
        console.log("✨".repeat(17));
      });
    } catch (error) {
      console.log("Server run error: ", error.message);
    }
  };
}

const server = new App();

connector.connectDB();
server.runServer();
