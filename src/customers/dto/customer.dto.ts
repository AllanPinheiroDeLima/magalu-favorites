import { ApiHideProperty, ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { IsEmail, IsNumberString, IsString } from "class-validator";
import { ProductResponseDto } from "../../products/dto/product.dto";

export class CreateCustomerDto {
    @ApiProperty()
    @IsString()
    name: string

    @ApiProperty()
    @IsEmail()
    email: string

    @ApiProperty()
    @IsString()
    password: string
}

export class FavoriteParams {
    @ApiProperty()
    @IsString()
    id: number
    
    @ApiProperty()
    @IsString()
    product_id: string
}

export class UpdateCustomerDto extends PartialType(OmitType(CreateCustomerDto, ["password"])) {}

export class IdParamDTO {
    @ApiProperty()
    @IsNumberString()
    id: number
}


class BaseCustomerResponse {
    @ApiProperty()
    name: string
    
    @ApiProperty()
    email: string
}

class ProductIdObj {
    @ApiProperty()
    productId: string
}

export class SimpleCustomerResponse extends BaseCustomerResponse {
    @ApiProperty({ type: () => [ProductIdObj] })
    favorites: ProductIdObj[]
}

export class CustomerResponse extends BaseCustomerResponse {
    @ApiProperty({ type: () => [ProductResponseDto] })
    favorites: ProductResponseDto[]
}