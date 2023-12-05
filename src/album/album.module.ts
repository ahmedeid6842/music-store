import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';

@Module({
  providers: [AlbumService],
  controllers: [AlbumController]
})
export class AlbumModule {}
