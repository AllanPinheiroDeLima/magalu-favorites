import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { CreateCustomerDto, CustomerResponse, FavoriteParams, IdParamDTO, SimpleCustomerResponse, UpdateCustomerDto } from './dto/customer.dto';

@Controller('customers')
@ApiTags("Customers API")
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  @ApiResponse({ type: [SimpleCustomerResponse] })
  findAll() {
    return this.customersService.findAll();
  }
  
  @Get(':id')
  @ApiParam({ name: "id" })
  @ApiResponse({ type: [CustomerResponse] })
  findOne(@Param() params: IdParamDTO) {
    const { id } = params;
    return this.customersService.findOne(Number(id), true);
  }

  @Put(':id')
  @ApiParam({ name: "id" })
  @HttpCode(204)
  update(@Param() params: IdParamDTO, @Body() updateCustomerDto: UpdateCustomerDto) {
    const { id } = params;
    return this.customersService.update(Number(id), updateCustomerDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiParam({ name: "id" })
  remove(@Param() params: IdParamDTO) {
    const {id} = params;
    return this.customersService.remove(Number(id));
  }

  @Post(":id/favorites/:product_id")
  @ApiParam({ name: "id" })
  @ApiParam({ name: "product_id" })
  @HttpCode(204)
  async addProductToFavorites (@Param() params: FavoriteParams) {
    const { id, product_id } = params;
  
    return this.customersService.addFavoriteToCustomer(id, product_id)
  }

  @Delete(":id/favorites/:product_id")
  @ApiParam({ name: "id" })
  @ApiParam({ name: "product_id" })
  @HttpCode(204)
  async removeProductToFavorites (@Param() params: FavoriteParams) {
    const { id, product_id } = params;

    return this.customersService.removeFavoriteFromList(id, product_id);
  }
}
