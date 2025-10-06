import { validate } from 'class-validator';
import { EditPostDto } from '../post/dto/edit-post.dto';

class TestEditPostDto extends EditPostDto {
  constructor() {
    super('default title', 'default content');
  }
}

describe('EditPostDto', () => {
  it('should pass validation when the DTO is an empty object', async () => {
    const dto = new TestEditPostDto();
    delete dto.title;
    delete dto.content;

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should pass validation when only the title is provided', async () => {
    const dto = new TestEditPostDto();
    dto.title = 'Título Atualizado';
    delete dto.content;

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should pass validation when only the content is provided', async () => {
    const dto = new TestEditPostDto();
    delete dto.title;
    dto.content = 'Conteúdo Atualizado';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should pass validation when both fields are provided', async () => {
    const dto = new TestEditPostDto('Título Novo', 'Conteúdo Novo');

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should pass validation when both fields are provided as empty strings', async () => {
    const dto = new TestEditPostDto('', '');

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });
});
