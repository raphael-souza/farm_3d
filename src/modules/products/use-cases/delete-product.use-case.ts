import { AppError } from "../../../shared/errors/app-errors";
import { ProductRepository } from "../product.repository";

export class DeleteProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string): Promise<void> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new Error("Product not found");
    }

    const deleted = await this.productRepository.delete(id);
    if (!deleted) {
      throw new AppError("Failed to delete product");
    }
  }

}