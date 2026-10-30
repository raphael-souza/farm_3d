
import { Router } from "express";
import { TypeOrmProductRepository } from "../repositories/typeorm-product.repository";
import { CreateProductUseCase } from "../use-cases/create-product.use-case";
import { ProductController } from "./product.controller";

const productRoutes = Router();

const productRepository = new TypeOrmProductRepository();
const createProductUseCase = new CreateProductUseCase(productRepository);
const productController = new ProductController(createProductUseCase);

productRoutes.post("/", (req, res, next) => {
  productController.create(req, res).catch(next);
});

export default productRoutes;
