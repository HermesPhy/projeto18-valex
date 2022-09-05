import db from "../database.js";

export interface Company {
  id: number;
  name: string;
  apiKey?: string;
}

export async function findByApiKey(apiKey: any) {
  try {
    console.log(apiKey);
    const result = await db.query<Company, [string]>(
      `SELECT * FROM companies WHERE "apiKey"=$1`,
      [apiKey]
    );
    console.log(result.rows);
    return result.rows[0];
  } catch (erro) {
    console.log(erro);
  }
}
