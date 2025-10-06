import { ListUsersDto } from '../user/dto/list-users.dto';

describe('ListUsersDto', () => {
  it('should be correctly instantiated with all properties', () => {
    const id = 'uuid-123';
    const username = 'testuser';
    const profile = 'student';

    const dto = new ListUsersDto(id, username, profile);

    expect(dto).toBeDefined();
    expect(dto.id).toBe(id);
    expect(dto.username).toBe(username);
    expect(dto.profile).toBe(profile);
  });
});
