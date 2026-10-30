import { Product } from "../product.entity";
import { ProductRepository } from "../product.repository";

interface CreateProductInput {
  name: string;
  description?: string;
  salePrice: string;
}

export class CreateProductUseCase {

  constructor(
    private readonly productRepository: ProductRepository
  ) {}

  async execute(input: CreateProductInput): Promise<Product> {
    const name = input.name.trim();

    if (!name) {
      throw new Error("O nome do produto é obrigatório");
    }

    if (!/^\d+(\.\d{1,2})?$/.test(input.salePrice)) {
      throw new Error("O preço de venda deve ser um número válido com até duas casas decimais");
    }

    return this.productRepository.create({
      ...input,
      name,
    });
  }
}