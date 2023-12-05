import { Injectable } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService) { }

    async register(user: CreateUserDto) {
    }
}
