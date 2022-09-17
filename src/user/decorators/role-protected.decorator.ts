import { SetMetadata } from '@nestjs/common';
import { validRoles } from 'src/utils/enums/valid.roles';

export const RoleProtected = (...args: validRoles[]) => SetMetadata('role-protected', args);
