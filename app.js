import express from "express";
import connector from "./db/db.js";
import routes from "./routes";
import dotenv from "dotenv";

dotenv.config();

export class App {
  constructor() {
    this.app = express();
  }

  runServer = async () => {
    try {
      this.app.listen(process.env.PORT, function () {
        console.log(`✨✨ Server Run,  Port : ${process.env.PORT} ✨✨`);
      });
    } catch (error) {
      console.log("Server run error: ", error.message);
    }
  };

  setAppRouter = () => {
    this.app.use("/api", routes, (error, request, response) => {
      response.status(400).json({
        success: false,
        error: error.message,
      });
    });
  };

  set = () => {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  };
}

const server = new App();

connector.connectDB();
server.set();
server.setAppRouter();
server.runServer();
