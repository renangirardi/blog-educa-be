import { validate } from 'class-validator';
import { EditUserDto } from '../user/dto/edit-user.dto';
import UserProfileEnum from '../enum/user-profile-enum';

class TestEditUserDto extends EditUserDto {
  constructor() {
    super('default', 'default@mail.com', UserProfileEnum.student);
  }
}

describe('EditUserDto', () => {
  it('should pass validation when the DTO is an empty object', async () => {
    const dto = new TestEditUserDto();
    delete dto.username;
    delete dto.email;
    delete dto.profile;

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should pass validation when only one field is provided and is not empty', async () => {
    const dto = new TestEditUserDto();
    delete dto.email;
    delete dto.profile;
    dto.username = 'new_username';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation when username is provided but is an empty string', async () => {
    const dto = new TestEditUserDto();
    dto.username = '';
    delete dto.email;
    delete dto.profile;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('username');
  });

  it('should fail validation when email is provided but is an empty string', async () => {
    const dto = new TestEditUserDto();
    delete dto.username;
    dto.email = '';
    delete dto.profile;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('email');
  });

  it('should fail validation when profile is provided but is an empty string', async () => {
    const dto = new TestEditUserDto();
    delete dto.username;
    delete dto.email;
    dto.profile = '' as any;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('profile');
  });
});
