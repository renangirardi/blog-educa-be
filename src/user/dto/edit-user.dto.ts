import { IsNotEmpty, IsOptional } from 'class-validator';
import UserProfileEnum from '../../enum/user-profile-enum';

export class EditUserDto {
  @IsNotEmpty()
  @IsOptional()
  username: string;

  @IsNotEmpty()
  @IsOptional()
  email: string;

  @IsNotEmpty()
  @IsOptional()
  password?: string;

  @IsNotEmpty()
  @IsOptional()
  profile?: UserProfileEnum;

  constructor(username: string, email: string, password: string, profile: UserProfileEnum) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.profile = profile;
  }
}
