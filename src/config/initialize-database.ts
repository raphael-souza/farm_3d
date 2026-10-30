import { AppDataSource } from "./database";

export async function initializeDatabase(): Promise<void> {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
    console.log("PostgreSQL conectado com sucesso");
  }
}