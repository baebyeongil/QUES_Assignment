import { Sequelize } from "sequelize";
import config from "../config/config.js";

const db = config.db;

class DBConnector {
  sequelize;
  constructor() {
    this.sequelize = new Sequelize(db.database, db.username, db.password, {
      host: db.host,
      dialect: "mysql",
    });
  }

  connectDB() {
    this.sequelize
      .sync({ force: false })
      .then(() => {
        console.log("✨".repeat(17));
        console.log("✨✨ Datebase is Connected 👍 ✨✨");
        console.log("✨".repeat(17));
      })
      .catch((error) => {
        console.error(error);
        throw new Error("Fail to connect..👎");
      });
  }
}
const connector = new DBConnector();

export default connector;
