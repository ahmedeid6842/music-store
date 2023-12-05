import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from './artist.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UserDto } from 'src/auth/dto/user.dto';
import { GetArtistQueryDto } from './dto/get-artist-query.dto';
import { PartialArtistDto } from './dto/partial-artist.dto';
import { UsersService } from 'src/auth/user.service';

@Injectable()
export class ArtistService {
    constructor(@InjectRepository(Artist) private artistRepo: Repository<Artist>, private userService: UsersService) { }

    async createArtist(artist: CreateArtistDto, user: UserDto) {
        const artistExists = await this.artistRepo.findOne({ where: { user } });
        
        if(artistExists) {
            throw new BadRequestException('Artist already exists');
        }

        const newArtist = this.artistRepo.create({ ...artist, user });
        return await this.artistRepo.save(newArtist);
    }



    async getArtist(query: GetArtistQueryDto) {
        let queryBuilder = await this.artistRepo.createQueryBuilder('artist');

        // Build query dynamically based on provided parameters in GetArtistQueryDto
        if (query.artistId) {
            queryBuilder = queryBuilder.where('artist.id = :artistId', { artistId: query.artistId });
        }

        if (query.userId) {
            queryBuilder = queryBuilder.andWhere('artist.userId=:userId', { userId: query.userId })
        }

        if (query.name) {
            queryBuilder = queryBuilder.andWhere('artist.name LIKE :name', { name: `%${query.name}%` });
        }

        if (query.bio) {
            queryBuilder = queryBuilder.andWhere('artist.bio LIKE :bio', { bio: `%${query.bio}%` });
        }

        return await queryBuilder.getMany();
    }

    async updateArtist(artist: PartialArtistDto, user: UserDto) {
        const artistToUpdate = await this.artistRepo.findOne({ where: { user } });
        if (!artistToUpdate) {
            throw new NotFoundException('Artist not found');
        }

        Object.assign(artistToUpdate, artist);
        return await this.artistRepo.save(artistToUpdate);
    }
}
