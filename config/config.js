import dotenv from "dotenv";

dotenv.config();
export default {
  db: {
    username: process.env.DBUSERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
  },
};
