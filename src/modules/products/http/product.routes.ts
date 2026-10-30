
import { Router } from "express";
import { TypeOrmProductRepository } from "../repositories/typeorm-product.repository";
import { CreateProductUseCase } from "../use-cases/create-product.use-case";
import { ProductController } from "./product.controller";
import { ListProductsUseCase } from "../use-cases/list-products.use-case";
import { ShowProductUseCase } from "../use-cases/show-product.use-case";
const productRoutes = Router();

const productRepository = new TypeOrmProductRepository();
const createProductUseCase = new CreateProductUseCase(productRepository);
const listProductsUseCase = new ListProductsUseCase(productRepository);
const findByIdUseCase = new ShowProductUseCase(productRepository);
const productController = new ProductController(
  createProductUseCase,
  listProductsUseCase,
  findByIdUseCase
);

productRoutes.post("/", (req, res, next) => {
  productController.create(req, res).catch(next);
});
productRoutes.get("/", (req, res, next) => {
  productController.index(req, res).catch(next);
});

productRoutes.get("/:id", (req, res, next) => {
  productController.show(req, res).catch(next);
});

export default productRoutes;
