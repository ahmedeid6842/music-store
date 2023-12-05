import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>) { }

    create(email: string, userName: string, password: string, verificationCode: string, verificationCodeExpiresAt: Date) {
        const user = this.userRepo.create({ email, userName, password, verificationCode, verificationCodeExpiresAt });

        return this.userRepo.save(user);
    }

    findOne(id: string) {
        if (!id) { 
            return null;
        }

        return this.userRepo.findOne({ where: { id } })
    }
}