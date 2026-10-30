import { Product } from "./product.entity";

export interface ProductRepository {
  create(data: {
    name: string;
    description?: string;
    salePrice: string;
  }): Promise<Product>;
  findAll(page: number, limit: number): Promise<[Product[], number]>;
  findById(id: string): Promise<Product | null>;
  update(id: string, data: { name?: string; description?: string; salePrice?: string }): Promise<Product | null>;
  delete(id: string): Promise<boolean>;
}