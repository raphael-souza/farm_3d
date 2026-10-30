import { Request, Response } from "express";
import { CreateProductUseCase } from "../use-cases/create-product.use-case";

export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    const product = await this.createProductUseCase.execute({
      name: req.body.name,
      description: req.body.description,
      salePrice: req.body.salePrice,
    });

    res.status(201).json(product);
  }
}