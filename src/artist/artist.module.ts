import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './artist.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Artist])],
  controllers: [ArtistController],
  providers: [ArtistService]
})
export class ArtistModule {}
