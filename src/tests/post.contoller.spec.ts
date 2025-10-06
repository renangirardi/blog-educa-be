import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from '../post/post.controller';
import { PostService } from '../post/post.service';
import { CreatePostDto } from '../post/dto/create-post.dto';
import { EditPostDto } from '../post/dto/edit-post.dto';
import { PostEntity } from '../entities/post.entity';
import { ListPostsDto } from '../post/dto/list-posts.dto';

const mockPostService = {
  createPost: jest.fn(),
  listPosts: jest.fn(),
  readPost: jest.fn(),
  searchPost: jest.fn(),
  editPost: jest.fn(),
  deletePost: jest.fn(),
};

describe('PostController', () => {
  let controller: PostController;
  let service: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [
        {
          provide: PostService,
          useValue: mockPostService,
        },
      ],
    }).compile();

    controller = module.get<PostController>(PostController);
    service = module.get<PostService>(PostService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createPost', () => {
    it('should call postService.createPost with the correct PostEntity and return a success message', async () => {
      const createPostDto: CreatePostDto = {
        title: 'New Post Title',
        content: 'Content of the new post',
      };

      const newPostEntity = {
        id: 'mock-id-123',
        title: createPostDto.title,
        content: createPostDto.content,
      } as PostEntity;

      (service.createPost as jest.Mock).mockImplementation(async (post: PostEntity) => {
        post.id = newPostEntity.id;
      });

      const result = await controller.createPost(createPostDto);

      expect(service.createPost).toHaveBeenCalledTimes(1);

      const createdPostArg = (service.createPost as jest.Mock).mock.calls[0][0];
      expect(createdPostArg).toBeInstanceOf(PostEntity);
      expect(createdPostArg.title).toBe(createPostDto.title);
      expect(createdPostArg.content).toBe(createPostDto.content);

      expect(result.message).toBe('Post created successfully');
      expect(result.post).toBeInstanceOf(ListPostsDto);
      expect(result.post.id).toBe(newPostEntity.id);
    });
  });

  describe('listPosts', () => {
    it('should call postService.listPosts and return the list of posts', async () => {
      const mockPosts: ListPostsDto[] = [
        { id: '1', title: 'Post 1', content: 'C1' },
        { id: '2', title: 'Post 2', content: 'C2' },
      ];

      (service.listPosts as jest.Mock).mockResolvedValue(mockPosts);

      const result = await controller.listPosts();

      expect(service.listPosts).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockPosts);
    });
  });

  describe('readPost', () => {
    it('should call postService.readPost with the correct ID and return the post', async () => {
      const postId = 'test-id';
      const mockPost: ListPostsDto = { id: postId, title: 'Read Post', content: 'Test Content' };

      (service.readPost as jest.Mock).mockResolvedValue(mockPost);

      const result = await controller.readPost(postId);

      expect(service.readPost).toHaveBeenCalledWith(postId);
      expect(service.readPost).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockPost);
    });
  });

  describe('searchPost', () => {
    it('should call postService.searchPost with the correct query and return the results', async () => {
      const query = 'nestjs';
      const mockResults: ListPostsDto[] = [{ id: '3', title: 'NestJS', content: 'Framework' }];

      (service.searchPost as jest.Mock).mockResolvedValue(mockResults);

      const result = await controller.searchPost(query);

      expect(service.searchPost).toHaveBeenCalledWith(query);
      expect(service.searchPost).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockResults);
    });
  });

  describe('editPost', () => {
    it('should call postService.editPost with the ID and DTO, and return a success message with the edited post', async () => {
      const postId = 'edit-id';
      const editPostDto: EditPostDto = { title: 'Updated Title' };
      const mockEditedPost: ListPostsDto = {
        id: postId,
        title: 'Updated Title',
        content: 'Original Content',
      };

      (service.editPost as jest.Mock).mockResolvedValue(mockEditedPost);

      const result = await controller.editPost(postId, editPostDto);

      expect(service.editPost).toHaveBeenCalledWith(postId, editPostDto);
      expect(service.editPost).toHaveBeenCalledTimes(1);
      expect(result.message).toBe('Post edited successfully');
      expect(result.post).toEqual(mockEditedPost);
    });
  });

  describe('deletePost', () => {
    it('should call postService.deletePost with the correct ID and return a success message with the deleted post', async () => {
      const postId = 'delete-id';
      const mockDeletedPost: ListPostsDto = { id: postId, title: 'To Be Deleted', content: 'Gone' };

      (service.deletePost as jest.Mock).mockResolvedValue(mockDeletedPost);

      const result = await controller.deletePost(postId);

      expect(service.deletePost).toHaveBeenCalledWith(postId);
      expect(service.deletePost).toHaveBeenCalledTimes(1);
      expect(result.message).toBe('Post deleted successfully');
      expect(result.post).toEqual(mockDeletedPost);
    });
  });
});
