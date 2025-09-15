import { Body, Injectable } from '@nestjs/common';
import { PostEntity } from './post.entity.js';

@Injectable()
export class PostRepository {
  private posts: PostEntity[] = [];

  createPost(postData: PostEntity) {
    this.posts.push(postData);
    return postData;
  }

  async getPosts() {
    return this.posts;
  }

  async editPost(id: string, postData: Partial<PostEntity>) {
    const targetPost = this.findPostIndexById(id);

    Object.entries(postData).forEach(([key, value]) => {
      if (key === 'id') {
        return;
      }

      targetPost[key] = value;
    });

    return targetPost;
  }

  async deletePost(id: string) {
    const targetPost = this.findPostIndexById(id);

    this.posts = this.posts.filter((post) => post.id !== id);

    return targetPost;
  }

  private findPostIndexById(id: string) {
    const searchedPost = this.posts.find((post) => post.id === id);

    if (!searchedPost) {
      throw new Error('Post not found');
    }

    return searchedPost;
  }
}
