import { Body, Controller, Post, Session } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() body: CreateUserDto, @Session() session: any) {
        return await this.authService.register(body);
    }

    @Post('verify-email')
    async verifyEmail(@Body() { email, verificationCode }: VerifyEmailDto, @Session() session: any) {
        const user = await this.authService.verifyEmail(email, verificationCode);
        
        session.userId = user.id;

        return user;
    }
}
