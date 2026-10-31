import { Router } from "express";

import { TypeOrmCustomerRepository } from "../customer.repository";
import { CreateCustomerUseCase } from "../use-cases/create-customer.use-case";
import { ListCustomersUseCase } from "../use-cases/list-customers.use-case";

const customerRoutes = Router();

const customerRepository = new TypeOrmCustomerRepository();
const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
const listCustomersUseCase = new ListCustomersUseCase(customerRepository);

customerRoutes.post("/", async (req, res, next) => {
  try {
    const customer = await createCustomerUseCase.execute({
      name: req.body.name,
      email: req.body.email,
    });
    res.status(201).json(customer);
  } catch (error) {
    next(error);
  }
});

customerRoutes.get("/", async (req, res, next) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const customers = await listCustomersUseCase.execute(page, limit);

    res.status(200).json(customers);
  } catch (error) {
    next(error);
  }
});

export default customerRoutes;