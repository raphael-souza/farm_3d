import { express } from "express";
import { CreateCustomerUseCase } from "../use-cases/create-customer.use-case";
import { ListCustomersUseCase } from "../use-cases/list-customers.use-case";
// import { ShowCustomerUseCase } from "../use-cases/show-customer.use-case";
// import { UpdateCustomerUseCase } from "../use-cases/update-customer.use-case";
// import { DeleteCustomerUseCase } from "../use-cases/delete-customer.use-case";
// import { CustomerSerializer } from "./customer.serializer";

export class CustomerController {
  constructor(
    private createCustomerUseCase: CreateCustomerUseCase,
    private listCustomersUseCase: ListCustomersUseCase
    // private showCustomerUseCase: ShowCustomerUseCase,
    // private updateCustomerUseCase: UpdateCustomerUseCase,
    // private deleteCustomerUseCase: DeleteCustomerUseCase
  ) {}

  async create(req: express.Request, res: express.Response): Promise<void> {
    const customer = await this.createCustomerUseCase.execute({
      name: req.body.name,
      email: req.body.email,
    });

    res.status(201).json(customer);
  }

  async index(req: express.Request, res: express.Response): Promise<void> {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const customers = await this.listCustomersUseCase.execute(page, limit);

    res.status(200).json(customers);
  }
}