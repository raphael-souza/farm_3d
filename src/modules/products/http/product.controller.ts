import { Request, Response } from "express";
import { CreateProductUseCase } from "../use-cases/create-product.use-case";
import { ListProductsUseCase } from "../use-cases/list-products.use-case";
import { ShowProductUseCase } from "../use-cases/show-product.use-case";
import { UpdateProductUseCase } from "../use-cases/update-product.use-case";
import { DeleteProductUseCase } from "../use-cases/delete-product.use-case";
import { ProductSerializer } from "./product.serializer";
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly listProductsUseCase: ListProductsUseCase,
    private readonly findByIdUseCase: ShowProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase
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
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const products = await this.listProductsUseCase.execute(page, limit);

    res.status(200).json({
      data: ProductSerializer.serializeCollection(products.data),
      meta: products.meta
    });
  }

  async show(req: Request, res: Response): Promise<void> {
    const id = req.params.id;

    if (typeof id !== "string") {
      res.status(400).json({ error: "ID inválido" });
      return;
    }

    const product = await this.findByIdUseCase.execute(id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json(product);
  }

  async update(req: Request, res: Response): Promise<void> {
    const id = req.params.id;

    if (typeof id !== "string") {
      res.status(400).json({ error: "ID inválido" });
      return;
    }

    console.log("**********************Request body:", req.body);

    const product = await this.updateProductUseCase.execute({
      id: id,
      name: req.body.name,
      description: req.body.description,
      salePrice: req.body.salePrice,
    });

    res.status(200).json(product);
  }

  async destroy(req: Request, res: Response): Promise<void> {
    const id = req.params.id;

    if (typeof id !== "string") {
      res.status(400).json({ error: "ID inválido" });
      return;
    }

    await this.deleteProductUseCase.execute(id);

    res.status(204).send();
  }
}