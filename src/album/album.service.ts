import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './album.entity';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Artist } from 'src/artist/artist.entity';
import { ArtistService } from 'src/artist/artist.service';

@Injectable()
export class AlbumService {
    constructor(
        @InjectRepository(Album) private readonly albumRepo: Repository<Album>,
        private readonly artistService: ArtistService
    ) { }

    async createAlbum(albumBody: CreateAlbumDto, artist: Artist) {
        const album = await this.albumRepo.create({ ...albumBody });
        album.artists = [artist];
        return await this.albumRepo.save(album);
    }


}
