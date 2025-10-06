import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from '../post/post.service';
import { PostEntity } from '../entities/post.entity';
import { ObjectLiteral, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ListPostsDto } from '../post/dto/list-posts.dto';
import { EditPostDto } from '../post/dto/edit-post.dto';

type MockRepository<T extends ObjectLiteral = any> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;

describe('PostService', () => {
  let service: PostService;
  let repository: MockRepository<PostEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: getRepositoryToken(PostEntity),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            findOneBy: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
    repository = module.get(getRepositoryToken(PostEntity));
  });

  it('deve criar um post', async () => {
    const post = { id: '1', title: 'Teste', content: 'Conteúdo' } as PostEntity;

    await service.createPost(post);

    expect(repository.save).toHaveBeenCalledWith(post);
  });

  it('deve listar posts e retornar ListPostsDto', async () => {
    const posts = [
      { id: '1', title: 'Título 1', content: 'Conteúdo 1' },
      { id: '2', title: 'Título 2', content: 'Conteúdo 2' },
    ] as PostEntity[];

    repository.find.mockResolvedValue(posts);

    const result = await service.listPosts();

    expect(result).toEqual([
      new ListPostsDto('1', 'Título 1', 'Conteúdo 1'),
      new ListPostsDto('2', 'Título 2', 'Conteúdo 2'),
    ]);
  });

  it('deve retornar um post pelo id', async () => {
    const post = { id: '1', title: 'Teste', content: 'Conteúdo' } as PostEntity;
    repository.findOneBy.mockResolvedValue(post);

    const result = await service.readPost('1');

    expect(result).toEqual(post);
    expect(repository.findOneBy).toHaveBeenCalledWith({ id: '1' });
  });

  it('deve buscar posts por título ou conteúdo', async () => {
    const posts = [{ id: '1', title: 'NestJS', content: 'Framework' }] as PostEntity[];

    repository.find.mockResolvedValue(posts);

    const result = await service.searchPost('Nest');

    expect(result).toEqual([new ListPostsDto('1', 'NestJS', 'Framework')]);
    expect(repository.find).toHaveBeenCalledWith({
      where: [{ title: expect.any(Object) }, { content: expect.any(Object) }],
    });
  });

  it('deve editar um post', async () => {
    const dto: EditPostDto = { title: 'Novo título', content: 'Novo conteúdo' };

    await service.editPost('1', dto);

    expect(repository.update).toHaveBeenCalledWith('1', dto);
  });

  it('deve deletar um post', async () => {
    await service.deletePost('1');

    expect(repository.delete).toHaveBeenCalledWith('1');
  });
});
