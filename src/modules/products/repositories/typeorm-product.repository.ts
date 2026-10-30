import { AppDataSource } from "../../../config/database";
import { Product } from "../product.entity";
import { ProductRepository } from "../product.repository";
import { Repository } from "typeorm";

export class TypeOrmProductRepository implements ProductRepository {
  private repository: Repository<Product>;

  constructor() {
    this.repository = AppDataSource.getRepository(Product);
  }

  async create(data: {
    name: string;
    description?: string;
    salePrice: string;
  }): Promise<Product> {
    const product = this.repository.create({
      name: data.name,
      description: data.description,
      salePrice: data.salePrice,
    });

    await this.repository.save(product);

    return product;
  }

  async findAll(): Promise<Product[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<Product | null> {
    const product = await this.repository.findOneBy({ id });
    return product || null;
  }
}