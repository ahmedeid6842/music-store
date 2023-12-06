import { Injectable, NotFoundException } from '@nestjs/common';
import { Song } from './song.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSongDto } from './dto/create-song.dto';
import { Artist } from 'src/artist/artist.entity';
import { GetSongQueryDto } from './dto/get-song-query.dto';
import { PartialSongDto } from './dto/partial-song.dto';

@Injectable()
export class SongService {
    constructor(@InjectRepository(Song) private songRepo: Repository<Song>) { }

    async createSong(newSong: CreateSongDto, artist: Artist) {
        const song = this.songRepo.create({ ...newSong, album: { id: newSong.albumId }, artist });
        return await this.songRepo.save(song);
    }

    async getSongs({ page, limit, id, albumId, title, sortField, sortOrder, artistId, duration }: GetSongQueryDto) {
        const skip = (page - 1) * limit || 0;

        const queryBuilder = this.songRepo.createQueryBuilder('song');

        queryBuilder.leftJoinAndSelect('song.album', 'album').leftJoinAndSelect('song.artist', 'artist');

        if (id) {
            queryBuilder.andWhere('song.id = :id', { id });
        }

        if (albumId) {
            queryBuilder.andWhere('song.albumId = :albumId', { albumId });
        }

        if (artistId) {
            queryBuilder.andWhere('song.artistId = :artistId', { artistId });
        }

        if (title) {
            queryBuilder.andWhere('song.title LIKE :title', { title: `%${title}%` });
        }

        if (duration) {
            queryBuilder.andWhere('song.duration = :duration', { duration })
        }

        if (sortField && sortOrder) {
            queryBuilder.orderBy(`song.${sortField}`, sortOrder);
        }

        const totalCount = await queryBuilder.getCount();

        const songs = await queryBuilder
            .skip(skip)
            .take(limit)
            .getMany();


        return {
            songs,
            totalCount,
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit)
        };
    }

    async updateSong(songId: string, newSong: PartialSongDto) {
        const song = await this.songRepo.findOne({ where: { id: songId } })

        if (!song) {
            return null;
        }

        Object.assign(song, newSong);
        return await this.songRepo.save(song)
    }

    async deleteSong(songId: string) {
        const song = await this.songRepo.findOne({ where: { id: songId } })

        if (!song) {
            throw new NotFoundException("Song not found")
        }

        await this.songRepo.delete(songId);

        return song;
    }
}
