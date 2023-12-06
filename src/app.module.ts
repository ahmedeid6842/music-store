import {  Module } from '@nestjs/common';
import { config } from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { JwtModule } from '@nestjs/jwt';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { SongModule } from './song/song.module';
config();

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "mysql",
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 3306,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true,
  }),
  JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: "1d"
    }
  }),
    AuthModule, EmailModule, ArtistModule, AlbumModule, SongModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
