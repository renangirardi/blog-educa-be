import { MinLength, IsEmail, IsNotEmpty } from 'class-validator';
import UserProfileEnum from '../../enum/user-profile-enum';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsNotEmpty()
  profile: UserProfileEnum;

  constructor(username: string, email: string, password: string, profile: UserProfileEnum) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.profile = profile;
  }

  //Comentário
}
