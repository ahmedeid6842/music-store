import { Injectable } from '@nestjs/common';
import { Artist } from './artist.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UserDto } from 'src/auth/dto/user.dto';

@Injectable()
export class ArtistService {
    constructor(@InjectRepository(Artist) private artistRepo: Repository<Artist>) { }

    async createArtist(body: CreateArtistDto, user: UserDto) {
        //create artist 
    }
}
