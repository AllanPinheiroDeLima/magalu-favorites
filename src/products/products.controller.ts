import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindProductParamDTO, PaginateResponse, ProductQueryDTO, ProductResponseDto } from './dto/product.dto';
import { ProductsService } from './products.service';

@Controller('products')
@ApiTags("Products API")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiResponse({ type: PaginateResponse })
  @ApiQuery({ name: "page", type: ProductQueryDTO })
  async findAll(@Query() query: ProductQueryDTO) {
    console.log(query)
    const { page } = query;
    return this.productsService.findAll(Number(page));
  }

  @Get(':id')
  @ApiResponse({ type: ProductResponseDto })
  @ApiParam({ name: "id", type: FindProductParamDTO })
  findOne(@Param() params: FindProductParamDTO) {
    const { id } = params;
    return this.productsService.findOne(id);
  }
}
