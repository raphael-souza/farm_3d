import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { Order } from "./order.entity";
import { Product } from "../products/product.entity";

@Entity({ name: "order_items" })

export class OrderItem {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Order, (order) => order.items, {
    nullable: false,
  })
  @JoinColumn({ name: "order_id" })
  order!: Order;

  @ManyToOne(() => Product, (product) => product.orderItems, {
    nullable: false,
  })
  @JoinColumn({ name: "product_id" })
  product!: Product;

  @Column({ type: "integer" })
  quantity!: number;

  @Column({
    name: "unit_price",
    type: "numeric",
    precision: 12,
    scale: 2,
  })
  unitPrice!: string;
}