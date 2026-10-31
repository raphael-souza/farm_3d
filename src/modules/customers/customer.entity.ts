import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Order } from "../orders/order.entity";


@Entity({ name: "customers" })
export class Customer {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 150 })
  name!: string;
  
  @Column({ type: "varchar", length: 150, unique: true })
  email!: string;
  
  @OneToMany(() => Order, (order) => order.customer)
  orders!: Order[];
}
