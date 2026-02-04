/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostEntity } from '../entities/post.entity';
import { ListPostsDto } from './dto/list-posts.dto';
import { EditPostDto } from './dto/edit-post.dto';
import { PostService } from './post.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles.decorator';
import UserProfile from '../enum/user-profile-enum';

@Controller('/posts')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  @Roles(UserProfile.teacher, UserProfile.admin)
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
  @Roles(UserProfile.teacher, UserProfile.admin)
  async editPost(@Param('id') id: string, @Body() postData: EditPostDto) {
    const editedPost = await this.postService.editPost(id, postData);
    return {
      message: 'Post edited successfully',
      post: editedPost,
    };
  }

  @Delete('/:id')
  @Roles(UserProfile.teacher, UserProfile.admin)
  async deletePost(@Param('id') id: string) {
    const deletedPost = await this.postService.deletePost(id);
    return {
      message: 'Post deleted successfully',
      post: deletedPost,
    };
  }
}
