import { validate } from 'class-validator';
import { CreateUserDto } from '../user/dto/create-user.dto';
import UserProfileEnum from '../enum/user-profile-enum';

const mockValidUser = new CreateUserDto(
  'testuser',
  'test@email.com',
  'password123',
  UserProfileEnum.student,
);

describe('CreateUserDto', () => {
  it('should pass validation when all fields are valid', async () => {
    const errors = await validate(mockValidUser);
    expect(errors.length).toBe(0);
  });

  describe('username validation', () => {
    it('should fail validation when username is empty', async () => {
      const dto = new CreateUserDto(
        '',
        mockValidUser.email,
        mockValidUser.password,
        mockValidUser.profile,
      );
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('username');
    });
  });

  describe('email validation', () => {
    it('should fail validation when email is not a valid format', async () => {
      const dto = new CreateUserDto(
        mockValidUser.username,
        'invalid-email',
        mockValidUser.password,
        mockValidUser.profile,
      );
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('email');
    });
  });

  describe('password validation', () => {
    it('should fail validation when password is less than 6 characters', async () => {
      const dto = new CreateUserDto(
        mockValidUser.username,
        mockValidUser.email,
        'short',
        mockValidUser.profile,
      );
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('password');
    });

    it('should pass validation when password is exactly 6 characters', async () => {
      const dto = new CreateUserDto(
        mockValidUser.username,
        mockValidUser.email,
        '123456',
        mockValidUser.profile,
      );
      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });
  });

  describe('profile validation', () => {
    it('should fail validation when profile is empty', async () => {
      // Simula profile vazio ou nulo
      const dto = new CreateUserDto(
        mockValidUser.username,
        mockValidUser.email,
        mockValidUser.password,
        undefined as any,
      );
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('profile');
    });
  });
});
