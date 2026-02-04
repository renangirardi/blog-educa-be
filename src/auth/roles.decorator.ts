import { SetMetadata } from '@nestjs/common';
import UserProfile from '../enum/user-profile-enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserProfile[]) => SetMetadata(ROLES_KEY, roles);
