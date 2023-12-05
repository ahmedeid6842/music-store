import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { FindManyOptions, Repository } from "typeorm";

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

    find(email?: string, userName?: string) {
        if (!email && !userName) {
            throw new BadRequestException("At least one of email or userName must be provided.")
        }

        const where: FindManyOptions<User>['where'] = {}; //Define the type of the where object. It represents the conditions used for finding entities in the find method.

        if (email) {
            where.email = email
        }

        if (userName) {
            where.userName = userName
        }

        return this.userRepo.find({ where });
    }

    async update(userId: string, attrs: Partial<User>) {
        const user = await this.findOne(userId);

        if (!user) {
            throw new NotFoundException('user not found');
        }

        Object.assign(user, attrs); 

        return this.userRepo.save(user); 
    }

}