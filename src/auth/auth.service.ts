import { 
HttpException, 
HttpStatus, 
Injectable, 
InternalServerErrorException, 
Logger, 
UnauthorizedException
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { MessageHandler } from 'src/utils/enums/message.handler';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

private readonly logger = new Logger('ProductsService');

async createAuth(createUserDto: CreateUserDto) {
  try {
    const { password, ...userData } = createUserDto;

    const user = this.userRepository.create({
      ...userData,
      password: bcrypt.hashSync(password, 10),
    });

    await this.userRepository.save(user);
    delete user.password;
    
    return {
      ...user,
      token: this.getJwtToken({ email: user.email }),
    };
    
  } catch (error) {
    if (error.code === '23505')
      throw new HttpException(
        'User is already exist',
        HttpStatus.BAD_REQUEST,
      );

    this.logger.error(error);
    throw new InternalServerErrorException(MessageHandler.UNEXPECTED_ERROR);
  }
}

async loginAuth(loginUserDto: LoginAuthDto) {
  const { password, email } = loginUserDto;
  const user = await this.userRepository.findOne({
    where: { email },
    select: { email: true, password: true },
  });

  if (!user)
    throw new UnauthorizedException(MessageHandler.UNAUTHORIZED_CREDENTIALS);

  if (!bcrypt.compareSync(password, user.password))
    throw new UnauthorizedException(MessageHandler.UNAUTHORIZED_CREDENTIALS);
  delete user.password;
  
  return {
    ...user,
    token: this.getJwtToken({ email: user.email }),
  };
}

private getJwtToken(payload: JwtPayload) {
  return this.jwtService.sign(payload);
}

}
