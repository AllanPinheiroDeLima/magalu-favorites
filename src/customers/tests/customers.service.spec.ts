import { ConflictException } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { Repository } from 'typeorm';
import { CustomersService } from '../customers.service';
import { CreateCustomerDto } from '../dto/customer.dto';
import { Customer } from '../entities/customer.entity';
import { Favorite } from '../entities/favorites.entity';

describe('CustomersController', () => {
    const customerRepository = {} as Repository<Customer>;
    const favoriteRepository = {} as Repository<Favorite>;
    const httpService = {} as ProductsService;

    let customerService = new CustomersService(customerRepository, favoriteRepository, httpService);
    const customerBody: CreateCustomerDto = {
        email: "email@email.com",
        name: "Name",
        password: "password"
    };

    it('Should create a customer', async () => {

        customerRepository.findOne = jest.fn().mockResolvedValue(undefined);
        customerRepository.save = jest.fn().mockResolvedValue(customerBody);


        const result = await customerService.create(customerBody);

        expect(customerRepository.findOne).toBeCalledWith({ email: "email@email.com" });
        expect(result).toStrictEqual({
            email: "email@email.com",
            name: "Name"
        })
        expect(customerRepository.save).toBeCalledWith({
            email: "email@email.com",
            name: "Name",
            password: "password"
        });
    });
    it('Should throw an ConflictException when a customer already exists', async () => {
        customerRepository.findOne = jest.fn().mockResolvedValue({});

        const fnCall = async () => await customerService.create(customerBody);

        await expect(fnCall()).rejects.toThrowError(ConflictException);
    });
});
