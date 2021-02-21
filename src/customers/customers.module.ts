import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Favorite } from './entities/favorites.entity';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer, Favorite]),
    ProductsModule
  ],
  controllers: [CustomersController],
  providers: [CustomersService]
})
export class CustomersModule {}
