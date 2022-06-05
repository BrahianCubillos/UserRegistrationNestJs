import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from './user.providers';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { IdNumberExists } from './validators/IdNumberExists'
import { EmailExists } from './validators/EmailExists';
import { PasswordConfirmation } from './validators/PasswordConfirmation';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...userProviders,
    UserService,
    IdNumberExists,
    EmailExists,
    PasswordConfirmation,
  ],
  controllers: [UserController],
})
export class UserModule {}