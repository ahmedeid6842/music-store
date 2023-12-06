import { Module } from '@nestjs/common';
import { SongController } from './song.controller';
import { SongService } from './song.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { ArtistModule } from 'src/artist/artist.module';
import { AlbumModule } from 'src/album/album.module';

@Module({
  imports: [TypeOrmModule.forFeature([Song]), ArtistModule, AlbumModule],
  controllers: [SongController],
  providers: [SongService]
})
export class SongModule { }
