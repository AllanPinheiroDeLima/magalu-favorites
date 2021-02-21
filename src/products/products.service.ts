import { BadRequestException, HttpService, Injectable, NotFoundException } from '@nestjs/common';
import { ProductResponseDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  
  constructor (
    private readonly httpService: HttpService
  ) {}

  async findAll(page: number = 1) {
    const { data: products } = await this.httpService.get(`/?page=${page}`)
      .toPromise()

    return products
  }

  async findOne(id: string) {
    try {
      const { data: product } = await this.httpService.get<ProductResponseDto>(`/${id}/`)
        .toPromise();

      return product
    } catch (err) {
      throw new NotFoundException("Product not found");
    }
  }
}
