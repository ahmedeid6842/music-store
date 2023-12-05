import { Module } from '@nestjs/common';
import { UsersService } from './user.service';

@Module({
  providers: [UsersService]
})
export class AuthModule {}
