import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, UseGuards } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CustomerJWTObject } from 'src/auth/auth.service';
import { User } from 'src/auth/decorators/user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';
import { CustomersService } from './customers.service';
import { CreateCustomerDto, CustomerResponse, IdParamDTO, SimpleCustomerResponse, UpdateCustomerDto } from './dto/customer.dto';
@Controller('customers')
@ApiSecurity("authentication")
@ApiTags("Customers API")
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: [SimpleCustomerResponse] })
  findAll() {
    return this.customersService.findAll();
  }
  
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: "id" })
  @ApiResponse({ type: [CustomerResponse] })
  findOne(@Param() params: IdParamDTO) {
    const { id } = params;
    return this.customersService.findOne(Number(id), true);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  update(
    @User() user: CustomerJWTObject, 
    @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customersService.update(user.sub, updateCustomerDto);
  }

  @Delete()
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  remove(@User() user: CustomerJWTObject) {
    return this.customersService.remove(user.sub);
  }
}
