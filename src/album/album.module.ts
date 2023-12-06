import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './album.entity';
import { ArtistModule } from 'src/artist/artist.module';

@Module({
  imports: [TypeOrmModule.forFeature([Album]), ArtistModule],
  providers: [AlbumService],
  controllers: [AlbumController],
  exports:[AlbumService]
})
export class AlbumModule { }
