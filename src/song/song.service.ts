import { Injectable } from '@nestjs/common';
import { Song } from './song.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSongDto } from './dto/create-song.dto';
import { Artist } from 'src/artist/artist.entity';

@Injectable()
export class SongService {
    constructor(@InjectRepository(Song) private songRepo: Repository<Song>) { }

    async createSong(newSong: CreateSongDto, artist: Artist) {
        // const song = this.songRepo.create({ ...newSong, album: { id: newSong.albumId }, artists: [artist] });
        // return await this.songRepo.save(song);
    }
}
