import { HttpModule, HttpService, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
  imports: [
    HttpModule.register({
      baseURL: process.env.MAGALU_PRODUCTS_BASE_URL
    })
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService]
})
export class ProductsModule {}
