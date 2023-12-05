import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService) { }

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

        const salt = await bcrypt.genSalt()
        password = await bcrypt.hash(password, salt);

        const verificationCode = "verificationCode";
        const verificationCodeExpiresAt = new Date();

        const user = await this.userService.create(email, userName, password, verificationCode, verificationCodeExpiresAt);

        //sent email verification code

        return user;
    }
}
