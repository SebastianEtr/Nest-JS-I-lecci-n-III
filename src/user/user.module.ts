import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';


@Module({
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}