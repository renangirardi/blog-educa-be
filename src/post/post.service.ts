import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListPostsDto } from './dto/list-posts.dto';
import { PostEntity } from '../entities/post.entity';
import { ILike, Repository } from 'typeorm';
import { EditPostDto } from './dto/edit-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async createPost(postEntity: PostEntity) {
    await this.postRepository.save(postEntity);
  }

  async listPosts() {
    const posts = await this.postRepository.find();
    const postsList = posts.map(
      (post) => new ListPostsDto(post.id, post.title, post.content, post.author),
    );

    return postsList;
  }

  async readPost(id: string) {
    const post = await this.postRepository.findOneBy({ id });
    return post;
  }

  async searchPost(query: string) {
    const posts = await this.postRepository.find({
      where: [{ title: ILike(`%${query}%`) }, { content: ILike(`%${query}%`) }],
    });

    return posts.map((post) => new ListPostsDto(post.id, post.title, post.content, post.author));
  }

  async editPost(id: string, postDto: EditPostDto) {
    await this.postRepository.update(id, postDto);
  }

  async deletePost(id: string) {
    await this.postRepository.delete(id);
  }
}
