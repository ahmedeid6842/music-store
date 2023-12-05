import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './artist.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CurrentArtistMiddleware } from './middleware/current-artist.middleware';

@Module({
  imports:[TypeOrmModule.forFeature([Artist]),AuthModule],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService]
})
export class ArtistModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CurrentArtistMiddleware)
      .forRoutes("*");
  }
}
