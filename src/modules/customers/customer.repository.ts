import { Customer } from "./customer.entity";

export interface CustomerRepository {
  create(data: {
    name: string;
    email: string;
  }): Promise<Customer>;
  findAll(page: number, limit: number): Promise<[Customer[], number]>;
  findById(id: string): Promise<Customer | null>;
}