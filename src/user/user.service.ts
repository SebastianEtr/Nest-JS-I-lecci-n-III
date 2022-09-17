import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) { }
  async createUser(userData: CreateUserDto) {
    try {
      const userCreated = await this.userRepo.save(userData)
      delete userCreated.password
      return userCreated
    } catch (e) {
      console.log(e)
      throw new HttpException('User cannot be created', HttpStatus.BAD_GATEWAY)
    }
  }
  async findAllUsers() {
    try {
      return await this.userRepo.find()
    } catch (e) {
      throw new HttpException('User cannot be found', HttpStatus.NOT_FOUND)
    }
  }
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
