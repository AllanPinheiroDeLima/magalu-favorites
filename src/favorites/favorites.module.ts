import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from 'src/customers/entities/favorites.entity';
import { ProductsModule } from 'src/products/products.module';
import { CustomersModule } from 'src/customers/customers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Favorite]),
    ProductsModule,
    CustomersModule
  ],
  providers: [FavoritesService],
  controllers: [FavoritesController]
})
export class FavoritesModule {}
