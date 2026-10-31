

import type { CustomerRepository } from '../customer.repository';

export class ListCustomersUseCase {
  constructor(
    private readonly customerRepository: CustomerRepository
  ) {}

  async execute(page: number, limit: number) {
    const [customers, total] = await this.customerRepository.findAll(page, limit);

    return {
      data: customers,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      }
    }
  }
}