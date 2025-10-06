import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { EditUserDto } from '../user/dto/edit-user.dto';
import { ListUsersDto } from '../user/dto/list-users.dto';
import UserProfile from '../enum/user-profile-enum';

const mockUserRepository = {
  save: jest.fn(),
  find: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should call userRepository.save with the user entity data', async () => {
      const userEntity = new UserEntity();
      userEntity.username = 'newuser';

      await service.createUser(userEntity);

      expect(repository.save).toHaveBeenCalledWith(userEntity);
      expect(repository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('listUsers', () => {
    it('should call userRepository.find and map the results to ListUsersDto', async () => {
      const mockUsers = [
        { id: '1', username: 'user1', profile: UserProfile.ADMIN } as UserEntity,
        { id: '2', username: 'user2', profile: UserProfile.CLIENT } as UserEntity,
      ];
      (repository.find as jest.Mock).mockResolvedValue(mockUsers);

      const result = await service.listUsers();

      expect(repository.find).toHaveBeenCalledTimes(1);
      expect(result.length).toBe(2);
      expect(result[0]).toBeInstanceOf(ListUsersDto);
      expect(result).toEqual([
        new ListUsersDto('1', 'user1', UserProfile.ADMIN),
        new ListUsersDto('2', 'user2', UserProfile.CLIENT),
      ]);
    });
  });

  describe('editUser', () => {
    it('should call userRepository.update with the user ID and DTO', async () => {
      const userId = 'update-id';
      const editDto: EditUserDto = { username: 'updated_name', email: 'new@mail.com' };

      await service.editUser(userId, editDto);

      expect(repository.update).toHaveBeenCalledWith(userId, editDto);
      expect(repository.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteUser', () => {
    it('should call userRepository.delete with the user ID', async () => {
      const userId = 'delete-id';

      await service.deleteUser(userId);

      expect(repository.delete).toHaveBeenCalledWith(userId);
      expect(repository.delete).toHaveBeenCalledTimes(1);
    });
  });
});
