import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostEntity } from '../entities/post.entity';
import { ListPostsDto } from './dto/list-posts.dto';
import { EditPostDto } from './dto/edit-post.dto';
import { PostService } from './post.service';

@Controller('/posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  async createPost(@Body() postData: CreatePostDto) {
    const post = new PostEntity();
    post.title = postData.title;
    post.content = postData.content;
    post.author = postData.author;

    await this.postService.createPost(post);

    return {
      message: 'Post created successfully',
      post: new ListPostsDto(post.id, post.title, post.content, post.author),
    };
  }

  @Get()
  async listPosts() {
    const savedPosts = await this.postService.listPosts();
    return savedPosts;
  }

  @Get('/:id')
  async readPost(@Param('id') id: string) {
    const post = await this.postService.readPost(id);
    return post;
  }

  @Get('/search/:query')
  async searchPost(@Param('query') query: string) {
    const searchRestult = await this.postService.searchPost(query);
    return searchRestult;
  }

  @Put('/:id')
  async editPost(@Param('id') id: string, @Body() postData: EditPostDto) {
    const editedPost = await this.postService.editPost(id, postData);
    return {
      message: 'Post edited successfully',
      post: editedPost,
    };
  }

  @Delete('/:id')
  async deletePost(@Param('id') id: string) {
    const deletedPost = await this.postService.deletePost(id);
    return {
      message: 'Post deleted successfully',
      post: deletedPost,
    };
  }
}
