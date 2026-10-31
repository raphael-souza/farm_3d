import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";

import { Customer } from "../customers/customer.entity";
import { OrderItem } from "./order-item.entity";

@Entity({ name: "orders" })
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Customer, (customer) => customer.orders, {
    nullable: false,
  })
  @JoinColumn({ name: "customer_id" })
  customer!: Customer;

  @OneToMany(() => OrderItem, (item) => item.order)
  items!: OrderItem[];

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt!: Date;
}