import { Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginResponse, LoginBody } from './dto/auth.dto';
import { LocalAuthGuard } from './guards/LocalAuth.guard';

@Controller('auth')
@ApiTags("Auth")
export class AuthController {

    constructor (
        private readonly authService: AuthService
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post("login")
    @HttpCode(200)
    @ApiBody({ type: LoginBody })
    @ApiOkResponse({ type: LoginResponse })
    async login(@Request() req): Promise<LoginResponse> {
        return this.authService.login(req.user);
    }
}
