import { ListPostsDto } from '../post/dto/list-posts.dto';

describe('ListPostsDto', () => {
  it('should be correctly instantiated with all properties', () => {
    const id = 'post-uuid-456';
    const title = 'Post Title';
    const content = 'Post Content Summary';

    const dto = new ListPostsDto(id, title, content);

    expect(dto).toBeDefined();
    expect(dto.id).toBe(id);
    expect(dto.title).toBe(title);
    expect(dto.content).toBe(content);
  });
});
