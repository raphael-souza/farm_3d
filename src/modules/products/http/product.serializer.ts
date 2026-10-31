import { Product } from '../product.entity';

export class ProductSerializer {
  static serialize(product: Product) {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.salePrice,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      active: product.active,
    };
  }

  static serializeCollection(products: Product[]) {
    return products.map((product) => this.serialize(product));
  }
}