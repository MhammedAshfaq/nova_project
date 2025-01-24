import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: process.env.SQLPASS,
  database: process.env.DEMO,
  synchronize: true,
  logging: false,
  entities: ["src/entities/*.ts"],
});

export default AppDataSource;
