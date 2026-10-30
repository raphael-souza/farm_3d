import { Product } from "../product.entity";
import { ProductRepository } from "../product.repository";

export class ListProductsUseCase {
  constructor(
    private readonly productRepository: ProductRepository
  ) {}

  async execute(page: number, limit: number) {
    const [products, total] = await this.productRepository.findAll(page, limit);

    return {
      data: products,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      }
    }
  }
}