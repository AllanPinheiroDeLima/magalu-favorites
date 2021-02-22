import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt-node';
import { Customer } from '../customers/entities/customer.entity';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export interface CustomerJWTObject {
    email: string
    sub: number
}

@Injectable()
export class AuthService {
    constructor (
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
        private readonly jwtService: JwtService
    ) {}

    private async findCustomerByEmail (email: string, shouldSelectPassword: boolean = false) {
        const customer = await this.customerRepository.findOne({ 
            where: { email },
            select: ["email", "password"]
        })
      
        if (!customer) {
          throw new NotFoundException("User not found")
        }
    
        return customer
    }
    
    async validateUser (email: string, password: string) {
        const customer = await this.findCustomerByEmail(email);

        const isValid = bcrypt.compareSync(password, customer.password);

        if (!isValid) {
            throw new ForbiddenException("Incorrect user or password");
        }

        delete customer.password;

        return customer
    }

    async login(customer: Customer): Promise<{ access_token: string }> {
        const payload: CustomerJWTObject = { 
            email: customer.email, 
            sub: Number(customer.id)
        };

        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
