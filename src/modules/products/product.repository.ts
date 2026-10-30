import { Product } from "./product.entity";

export interface ProductRepository {
  create(data: {
    name: string;
    description?: string;
    salePrice: string;
  }): Promise<Product>;
  findAll(): Promise<Product[]>;
}