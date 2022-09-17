
import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// import { RoleProtected } from 'src/auth/decorators/auth.decorator';
import { validRoles } from 'src/utils/enums/valid.roles';
import { UserRoleGuard } from '../guards/user-role.guard';


export function Auth(...roles: validRoles[]) {
    return applyDecorators(
      //RoleProtected(...roles),
      UseGuards(AuthGuard(), UserRoleGuard),
    );
  }
