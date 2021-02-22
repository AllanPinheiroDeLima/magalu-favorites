import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from '../products/products.service';
import { Repository } from 'typeorm';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';
import { Customer } from './entities/customer.entity';
@Injectable()
export class CustomersService {
  constructor (
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly productsService: ProductsService
  ) {}
  
  async findCustomerByEmail (email: string) {
    return this.customerRepository.findOne({ email })
  }

  async create(createCustomerDto: CreateCustomerDto) {
    const { email, password } = createCustomerDto;
    const customerExists = await this.findCustomerByEmail(email);

    if (customerExists) {
      throw new ConflictException("User already exists")
    }

    const customer = new Customer()
    customer.email = email;
    customer.password = password;
    customer.name = createCustomerDto.name;

    const user = await this.customerRepository.save(customer);
    
    delete user.password;

    return user;
  }

  findAll() {
    return this.customerRepository.find({relations: ["favorites"]})
  }

  async findOne(id: number, shouldGetProducts: boolean = false) {
    const customer = await this.customerRepository.findOne(id, { relations: ["favorites"] })

    if (!customer) {
      throw new NotFoundException("Customer not found");
    }
    
    if (customer.favorites?.length && shouldGetProducts) {
      const favorites = customer.favorites.map((favorite) => {
        return this.productsService.findOne(favorite.product_id);
      })
  
      let resolved = await Promise.all(favorites);
      
      customer.favorites = resolved.map(resolved => ({ ...resolved, product_id: resolved.id }));

      return customer;
    }
    
    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.findOne(id);

    const emailExists = await this.findCustomerByEmail(updateCustomerDto.email);

    if (emailExists) {
      throw new ConflictException("Email already exists")
    }

    const merged = this.customerRepository.merge(customer, updateCustomerDto);
  
    await this.customerRepository.save(merged)
  }

  async remove(id: number) {
    const customer = await this.findOne(id);
    return this.customerRepository.remove(customer);
  }
}
