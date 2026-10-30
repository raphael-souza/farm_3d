
import "reflect-metadata";
import "dotenv/config";
import express from "express";
import { initializeDatabase } from "./config/initialize-database";
import productRoutes from "./modules/products/http/product.routes";
import { errorHandler } from "./shared/http/middlewares/error-handler";

async function bootstrap(): Promise<void> {
  const app = express();
  const port = Number(process.env.PORT ?? 3000);

  app.use(express.json());
  app.use("/products", productRoutes);
  app.get("/health", (_req, res) => {
    res.status(200).json({
      status: "ok",
      application: "Farm3D",
    });
  });

  app.use(errorHandler);

  app.use(
    (
      error: Error,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction
    ) => {
      console.error("Error:", error);
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  )

  await initializeDatabase();

  app.listen(port, "0.0.0.0", () => {
    console.log(`Farm3D API running on port ${port}`);
  });
}

bootstrap().catch((error) => {
  console.error("Error during application bootstrap:", error);
  process.exit(1);
});