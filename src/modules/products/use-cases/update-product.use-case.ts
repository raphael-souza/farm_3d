import { Product } from "../product.entity";
import { ProductRepository } from "../product.repository";

interface UpdateProductInput {
  id: string;
  name?: string;
  description?: string | null;
  salePrice?: string;
}

export class UpdateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: UpdateProductInput): Promise<Product | null> {
    if (input.name !== undefined && !input.name.trim()) {
      throw new Error("Product name cannot be empty");
    }

    if (input.salePrice !== undefined && !input.salePrice.trim()) {
      throw new Error("Product sale price cannot be empty");
    }

    const updatedProduct = await this.productRepository.update(
      input.id,
      {
        ...input,
        name: input.name?.trim(),
        description:
          input.description === null ? undefined : input.description,
      }
    );

    if (!updatedProduct) {
      throw new Error("Product not found");
    }

    return updatedProduct;
  }
}