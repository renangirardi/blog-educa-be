import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }
}
