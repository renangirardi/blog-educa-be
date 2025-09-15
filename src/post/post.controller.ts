import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PostRepository } from './post.repository.js';
import { CreatePostDto } from './dto/create-post.dto.js';
import { PostEntity } from './post.entity.js';
import { ListPostsDto } from './dto/list-posts.dto.js';
import { EditPostDto } from './dto/edit-post.dto.js';
import { v4 as uuid } from 'uuid';

@Controller('/posts')
export class PostController {
  constructor(private postRepository: PostRepository) {}

  @Post()
  createPost(@Body() postData: CreatePostDto) {
    const post = new PostEntity();
    post.id = uuid();
    post.title = postData.title;
    post.content = postData.content;
    post.createDate = new Date();

    this.postRepository.createPost(post);
    return {
      message: 'Post created successfully',
      post: new ListPostsDto(post.id, post.title, post.content),
    };
  }

  @Get()
  async getPosts() {
    const savedPosts = await this.postRepository.getPosts();
    const postsList = savedPosts.map((post) => new ListPostsDto(post.id, post.title, post.content));
    return postsList;
  }

  @Patch('/:id')
  async editPost(@Param('id') id: string, @Body() postData: EditPostDto) {
    const editedPost = await this.postRepository.editPost(id, postData);
    return {
      message: 'Post edited successfully',
      post: new ListPostsDto(editedPost.id, editedPost.title, editedPost.content),
    };
  }

  @Delete('/:id')
  async deletePost(@Param('id') id: string) {
    const deletedPost = await this.postRepository.deletePost(id);
    return {
      message: 'Post deleted successfully',
      post: deletedPost,
    };
  }
}
