import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EmailModule } from 'src/email/email.module';
import { CurrentUserMiddleware } from './middleware/cuurent-user.middleware';
import { IsValidToken } from './middleware/is-valid-token.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User]), EmailModule],
  providers: [UsersService, AuthService],
  controllers: [AuthController]
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IsValidToken)
      .forRoutes({ path: 'auth/reset-password/:token', method: RequestMethod.POST })
      .apply(CurrentUserMiddleware)
      .forRoutes("*");
  }
}
