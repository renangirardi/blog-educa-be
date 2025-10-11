import { validate } from 'class-validator';
import { CreatePostDto } from '../post/dto/create-post.dto';

const mockValidPost = new CreatePostDto('Título de Teste', 'Conteúdo Completo da Postagem');

describe('CreatePostDto', () => {
  it('should pass validation when both title and content are valid', async () => {
    const errors = await validate(mockValidPost);
    expect(errors.length).toBe(0);
  });

  it('should fail validation when title is an empty string', async () => {
    const dto = new CreatePostDto('', mockValidPost.content);
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((e) => e.property === 'title')).toBe(true);
  });

  it('should fail validation when content is an empty string', async () => {
    const dto = new CreatePostDto(mockValidPost.title, '');
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((e) => e.property === 'content')).toBe(true);
  });

  it('should fail validation when both title and content are empty strings', async () => {
    const dto = new CreatePostDto('', '');
    const errors = await validate(dto);
    expect(errors.length).toBe(2);
    expect(
      errors.every((e) => e.constraints && Object.keys(e.constraints).includes('isNotEmpty')),
    ).toBe(true);
  });
});
