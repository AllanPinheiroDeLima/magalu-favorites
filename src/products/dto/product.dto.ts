import { ApiProperty } from "@nestjs/swagger"
import { IsNumberString, IsOptional, IsString } from "class-validator"

export class ProductResponseDto {
    @ApiProperty()
    price: string
    @ApiProperty()
    image: string
    @ApiProperty()
    brand: string
    @ApiProperty()
    id: string
    @ApiProperty()
    title: string
    @ApiProperty()
    reviewScore: number
}


class PageMeta {
    @ApiProperty()
    page_number: number
    
    @ApiProperty()
    page_size: number
    
}

export class PaginateResponse {
    @ApiProperty()
    meta: PageMeta
    
    @ApiProperty({ type: () => [ProductResponseDto] })
    products: ProductResponseDto[]
}

export class ProductQueryDTO {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumberString()
    page: number
}

export class FindProductParamDTO {
    @ApiProperty()
    @IsString()
    id: string
}