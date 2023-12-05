import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { customAlphabet } from 'nanoid';
import { EmailService } from 'src/email/email.service';


@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService, private readonly emailService: EmailService) { }

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
