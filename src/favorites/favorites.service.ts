import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomersService } from 'src/customers/customers.service';
import { Favorite } from 'src/customers/entities/favorites.entity';
import { ProductsService } from 'src/products/products.service';
import { Repository } from 'typeorm';

@Injectable()
export class FavoritesService {
    
  constructor (
      @InjectRepository(Favorite)
      private readonly favoriteRepository: Repository<Favorite>,
      private readonly customerService: CustomersService,
      private readonly productsService: ProductsService
  ) {}

  async addFavoriteToCustomer (customerId: number, productId: string) {
    const customer = await this.customerService.findOne(customerId);

    const product = await this.productsService.findOne(productId);

    const productIsInList = customer.favorites
    .find(favorite => favorite.product_id === productId);

    if (productIsInList) {
      throw new ConflictException("Product already is in your favorite's list")
    }

    const favorite = new Favorite()
    favorite.customer = customer;
    favorite.product_id = product.id;

    await this.favoriteRepository.save(favorite);
  }

  async removeFavoriteFromList (customerId: number, productId: string) {
    const favorite = await this.favoriteRepository.findOne({
      where: {
        customer: { id: customerId },
        product_id: productId
      }
    });

    await this.favoriteRepository.remove(favorite);
  }
}
