import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from '../customers.controller';
import { CustomersService } from '../customers.service';

describe('CustomersController', () => {
  let customerService = {} as CustomersService;
  let controllerController = new CustomersController(customerService);

  it('Should call service with params', async () => {
    customerService.findOne = jest.fn().mockResolvedValue({});

    await controllerController.findOne({ id: 1 });

    expect(customerService.findOne).toBeCalledWith(1, true)
  });
});
