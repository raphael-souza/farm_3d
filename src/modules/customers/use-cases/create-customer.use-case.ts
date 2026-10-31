import { Customer } from "../customer.entity";
import { CustomerRepository} from "../customer.repository";

interface CreateCustomerInput {
  name: string;
  email: string;
}

export class CreateCustomerUseCase {

  constructor(
    private readonly customerRepository: CustomerRepository
  ) {}

  async execute(input: CreateCustomerInput): Promise<Customer> {
    const name = input.name.trim();
    const email = input.email.trim();

    if (!name) {
      throw new Error("O nome do cliente é obrigatório");
    }

    if (!email) {
      throw new Error("O email do cliente é obrigatório");
    }

    return this.customerRepository.create({
      ...input,
      name,
      email,
    });
  }
}