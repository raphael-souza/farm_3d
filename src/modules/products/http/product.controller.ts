import { Request, Response } from "express";
import { CreateProductUseCase } from "../use-cases/create-product.use-case";
import { ListProductsUseCase } from "../use-cases/list-products.use-case";
import { ShowProductUseCase } from "../use-cases/show-product.use-case";
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly listProductsUseCase: ListProductsUseCase,
    private readonly findByIdUseCase: ShowProductUseCase
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    const product = await this.createProductUseCase.execute({
      name: req.body.name,
      description: req.body.description,
      salePrice: req.body.salePrice,
    });

    res.status(201).json(product);
  }

  async index(req: Request, res: Response): Promise<void> {
    const products = await this.listProductsUseCase.execute();
    res.status(200).json(products);
  }

  async show(req: Request, res: Response): Promise<void> {
    const product = await this.findByIdUseCase.execute(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json(product);
  }
}