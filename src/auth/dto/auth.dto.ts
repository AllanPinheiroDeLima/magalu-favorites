import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginBody {
    @ApiProperty()
    @IsEmail()
    email: string

    @ApiProperty()
    @IsString()
    password: string
}

export class LoginResponse {
    @ApiProperty()
    access_token: string
}