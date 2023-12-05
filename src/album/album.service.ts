import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './album.entity';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Artist } from 'src/artist/artist.entity';
import { ArtistService } from 'src/artist/artist.service';
import { GetAlbumQueryDto } from './dto/get-album-query.dto';

@Injectable()
export class AlbumService {
    constructor(
        @InjectRepository(Album) private readonly albumRepo: Repository<Album>,
    ) { }

    async createAlbum(albumBody: CreateAlbumDto, artist: Artist) {
        const album = await this.albumRepo.create({ ...albumBody });
        album.artists = [artist];
        return await this.albumRepo.save(album);
    }

    async getAlbums({ id, title, sortField, sortOrder, artworkUrl, page, limit }: GetAlbumQueryDto) {
        const queryBuilder = this.albumRepo.createQueryBuilder('albums');

        if (id) {
            queryBuilder.andWhere('albums.id = :id', { id });
        }

        if (title) {
            queryBuilder.andWhere('albums.title LIKE :title', { title: `%${title}%` });
        }

        if (artworkUrl) {
            queryBuilder.andWhere('albums.artworkUrl LIKE :artworkUrl', { artworkUrl: `%${artworkUrl}%` });
        }

        if (sortField && sortOrder) {
            queryBuilder.orderBy(`albums.${sortField}`, sortOrder);
        }

        const totalCount = await queryBuilder.getCount();

        const albums = await queryBuilder
            .skip((page - 1) * limit)
            .take(limit)
            .getMany();

        return {
            albums,
            totalCount,
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit),
        };
    }
}
