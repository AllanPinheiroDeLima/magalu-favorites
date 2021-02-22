import { Controller, Delete, HttpCode, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CustomerJWTObject } from 'src/auth/auth.service';
import { FavoriteParams } from 'src/customers/dto/customer.dto';
import { User } from '../auth/decorators/user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
@ApiTags("Favorites")
@ApiSecurity("authentication")
export class FavoritesController {

    constructor (
        private readonly favoritesService: FavoritesService
    ) {}

    @Post(":product_id")
    @UseGuards(JwtAuthGuard)
    @ApiParam({ name: "product_id" })
    @HttpCode(204)
    async addProductToFavorites (
      @Param() params: FavoriteParams,
      @User() user: CustomerJWTObject
      ) {
      const { product_id } = params;
      return this.favoritesService.addFavoriteToCustomer(user.sub, product_id)
    }
  
    @Delete(":product_id")
    @UseGuards(JwtAuthGuard)
    @ApiParam({ name: "product_id" })
    @HttpCode(204)
    async removeProductToFavorites (
      @Param() params: FavoriteParams,
      @User() user: CustomerJWTObject
      ) {
      const { product_id } = params;
      return this.favoritesService.removeFavoriteFromList(user.sub, product_id);
    }
}
