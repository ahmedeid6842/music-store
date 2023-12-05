import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type:"mysql",
    host:"localhost",
    port:3306,
    username:"root",
    password:"ahmed",
    database:"MusicStore",
    entities:["dist/**/*.entity{.ts,.js}"],
    synchronize:true,
  }), AuthModule, EmailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
