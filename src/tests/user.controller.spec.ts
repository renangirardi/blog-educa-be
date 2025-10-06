import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user/user.controller';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { EditUserDto } from '../user/dto/edit-user.dto';
import { UserEntity } from '../entities/user.entity';
import UserProfile from '../enum/user-profile-enum';

const mockUserService = {
  createUser: jest.fn(),
  listUsers: jest.fn(),
  editUser: jest.fn(),
  deleteUser: jest.fn(),
};

const mockUserEntity = {
  id: 'user-id-1',
  username: 'testuser',
  email: 'test@example.com',
  profile: UserProfile.student,
} as UserEntity;

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createUser', () => {
    const createDto: CreateUserDto = {
      username: 'newuser',
      email: 'new@example.com',
      password: 'securePassword',
      profile: UserProfile.student,
    };

    it('should successfully create a user and return the created user data', async () => {
      (service.createUser as jest.Mock).mockResolvedValue(mockUserEntity);

      const result = await controller.createUser(createDto);

      expect(service.createUser).toHaveBeenCalledTimes(1);

      const createdUserArg = (service.createUser as jest.Mock).mock.calls[0][0];
      expect(createdUserArg).toBeInstanceOf(UserEntity);
      expect(createdUserArg.username).toBe(createDto.username);

      expect(result.message).toBe('User created successfully');
      expect(result.user).toEqual(mockUserEntity);
    });

    it('should throw an error if an invalid user profile is provided', async () => {
      const invalidDto: CreateUserDto = {
        ...createDto,
        profile: 'INVALID_PROFILE' as UserProfile,
      };

      await expect(controller.createUser(invalidDto)).rejects.toThrow('Invalid user profile');

      expect(service.createUser).not.toHaveBeenCalled();
    });
  });

  describe('getUsers', () => {
    it('should call userService.listUsers and return the list of users', async () => {
      const mockUsers = [mockUserEntity, { ...mockUserEntity, id: '2', username: 'user2' }];

      (service.listUsers as jest.Mock).mockResolvedValue(mockUsers);

      const result = await controller.getUsers();

      expect(service.listUsers).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockUsers);
    });
  });

  describe('editUser', () => {
    it('should call userService.editUser with the correct ID and DTO, and return a success message', async () => {
      const userId = 'edit-id';
      const editDto: EditUserDto = { email: 'updated@email.com' };
      const mockEditedUser = { ...mockUserEntity, email: editDto.email };

      (service.editUser as jest.Mock).mockResolvedValue(mockEditedUser);

      const result = await controller.editUser(userId, editDto);

      expect(service.editUser).toHaveBeenCalledWith(userId, editDto);
      expect(service.editUser).toHaveBeenCalledTimes(1);
      expect(result.message).toBe('User edited successfully');
      expect(result.post).toEqual(mockEditedUser);
    });
  });

  describe('deleteUser', () => {
    it('should call userService.deleteUser with the correct ID and return a success message', async () => {
      const userId = 'delete-id';

      (service.deleteUser as jest.Mock).mockResolvedValue(mockUserEntity);

      const result = await controller.deleteUser(userId);

      expect(service.deleteUser).toHaveBeenCalledWith(userId);
      expect(service.deleteUser).toHaveBeenCalledTimes(1);
      expect(result.message).toBe('User deleted successfully');
      expect(result.post).toEqual(mockUserEntity);
    });
  });
});
