import { Product } from "../product.entity";
import { ProductRepository } from "../product.repository";

export class ListProductsUseCase {
  constructor(
    private readonly productRepository: ProductRepository
  ) {}

  async execute(): Promise<Product[]> {
    return this.productRepository.findAll();
  }
}