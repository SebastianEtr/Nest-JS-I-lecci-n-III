import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiProperty } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserRoles } from 'src/utils/enums/user.types';
import { RoleProtected } from './decorators/role-protected.decorator';
import { UserRoleGuard } from 'src/auth/guards/user-role.guard';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { validRoles } from 'src/utils/enums/valid.roles';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Auth(validRoles.ADMIN)
  @RoleProtected(validRoles.ADMIN)
  @UseGuards(AuthGuard(), UserRoleGuard)
  @UseGuards(AuthGuard())
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  @RoleProtected(validRoles.USER)
  @UseGuards(AuthGuard(), UserRoleGuard)
  @UseGuards(AuthGuard())
  findAll() {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  @RoleProtected(validRoles.USER)
  @UseGuards(AuthGuard(), UserRoleGuard)
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @RoleProtected(validRoles.ADMIN)
  @UseGuards(AuthGuard(), UserRoleGuard)
  @UseGuards(AuthGuard())
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @RoleProtected(validRoles.ADMIN)
  @UseGuards(AuthGuard(), UserRoleGuard)
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
