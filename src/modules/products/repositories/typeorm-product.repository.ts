import { AppDataSource } from "../../../config/database";
import { Product } from "../product.entity";
import { ProductRepository } from "../product.repository";
import { Repository } from "typeorm";

// o Repository é uma classe do TypeORM que fornece métodos para interagir com o banco de dados, como salvar, buscar, 
// atualizar e deletar registros. Ele é usado para encapsular a lógica de acesso aos dados e fornecer uma INTERFACE 
// consistente para trabalhar com entidades do banco de dados.
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

  async findAll(page: number, limit: number): Promise<[Product[], number]> {
    const [products, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        name: "ASC"
      }
    });
    return [products, total];
  }

  async findById(id: string): Promise<Product | null> {
    const product = await this.repository.findOneBy({ id });
    return product || null;
  }

  async update(id: string, data: { name?: string; description?: string; salePrice?: string }): Promise<Product | null> {
    const product = await this.repository.findOneBy({ id });
    if (!product) {
      return null;
    }
    this.repository.merge(product, data);
    await this.repository.save(product);
    return product;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== undefined && result.affected > 0;
  }
}