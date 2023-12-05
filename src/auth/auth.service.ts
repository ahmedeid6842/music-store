import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { customAlphabet } from 'nanoid';
import { EmailService } from 'src/email/email.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from "@nestjs/jwt"



@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly emailService: EmailService,
        private readonly jwtService: JwtService
    ) { }

    async register({ email, password, userName }: CreateUserDto) {
        // check if user email is unique
        const userByEmail = await this.userService.find(email);
        if (userByEmail.length) {
            throw new BadRequestException(`this email:${email} already exists`);
        }

        // check if user userName is unique 
        const userByName = await this.userService.find(null, userName);
        if (userByName.length) {
            throw new BadRequestException(`this userName: ${userName} already exist`)
        }

        // generate salts
        const salt = await bcrypt.genSalt()
        password = await bcrypt.hash(password, salt);

        // generate verification code and expiration
        const verificationCode = this.generateVerificationCode();
        const verificationCodeExpiresAt = this.generateVerificationCodeExpiration();

        //create user
        const user = await this.userService.create(email, userName, password, verificationCode, verificationCodeExpiresAt);

        //sent email verification code
        await this.emailService.sendVerificationEmail(email, verificationCode);

        return user;
    }

    async verifyEmail(email: string, verificationCode: string) {
        const [user] = await this.userService.find(email);

        if (!user) {
            throw new NotFoundException(`user not found`)
        }

        if (user.isVerified) {
            throw new BadRequestException(`user already verified`)
        }

        if (user.verificationCode !== verificationCode) {
            throw new BadRequestException(`invalid verification code`)
        }

        if (user.verificationCodeExpiresAt < new Date()) {
            throw new BadRequestException(`verification code expired`)
        }

        return await this.userService.update(user.id, { isVerified: true, verificationCode: null, verificationCodeExpiresAt: null })
    }

    async login(userCredentials: LoginUserDto) {
        const user = await this.userService.find(userCredentials.email, userCredentials.userName);

        if (!user.length) {
            throw new NotFoundException(`user not found`)
        }

        const verifiedUser = await bcrypt.compare(userCredentials.password, user[0].password)

        if (!verifiedUser) {
            throw new BadRequestException('incorrect password')
        }

        return user[0];
    }

    async sendResetPasswordEmail(userData: any) {
        const [user] = await this.userService.find(userData.email, userData.userName);

        if (!user) {
            throw new NotFoundException(`user not found`)
        }

        const token = this.generateResetPasswordToken(user.id)
        const resetPasswordUrl = process.env.Music_URL || `localhost:3000/auth/reset-password/${token}`

        // sent reset password token.
        await this.emailService.sendResetPasswordEmail(user.email, resetPasswordUrl);
    }

    async resetPassword(token: string, password: string) {
        const { userId } = await this.jwtService.decode(token) as { userId: string };

        if (!userId) {
            throw new BadRequestException('Invalid reset password token.');
        }

        const salt = await bcrypt.genSalt()
        password = await bcrypt.hash(password, salt);
        return await this.userService.update(userId, { password })
    }

    private generateResetPasswordToken(userId: string): string {
        return this.jwtService.sign({ userId }, { expiresIn: '1h' })
    }

    private generateVerificationCode(): string {
        const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const codeLength = 6;
        return customAlphabet(alphabet, codeLength)();
    }

    private generateVerificationCodeExpiration(): Date {
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 1);
        return expiration;
    }
}
