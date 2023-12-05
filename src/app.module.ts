import {  Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { JwtModule } from '@nestjs/jwt';
import { ArtistModule } from './artist/artist.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "ahmed",
    database: "MusicStore",
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true,
  }),
  JwtModule.register({
    global: true,
    secret: "MusicStoreSecretKey",
    signOptions: {
      expiresIn: "1d"
    }
  }),
    AuthModule, EmailModule, ArtistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
