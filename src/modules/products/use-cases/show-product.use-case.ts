import { ProductRepository } from "../product.repository";
import { Product } from "../product.entity";

export class ShowProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string): Promise<Product | null> {
    const product = await this.productRepository.findById(id);
    return product;
  }
}