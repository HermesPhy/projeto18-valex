import dotenv from "dotenv";
import pg from "pg";
dotenv.config();

const dbConfig = {
  connectionString: process.env.DATABASE_URL,
};

const { Pool } = pg;
const db = new Pool(dbConfig);

export default db;
