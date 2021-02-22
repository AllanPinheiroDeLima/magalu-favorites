import { Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/LocalAuth.guard';

@Controller('auth')
export class AuthController {

    constructor (
        private readonly authService: AuthService
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post("login")
    @HttpCode(200)
    async login(@Request() req): Promise<{ access_token: string }> {
        return this.authService.login(req.user);
    }
}
