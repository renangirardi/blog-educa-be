import { IsOptional } from 'class-validator';

export class EditPostDto {
  @IsOptional()
  title: string;

  @IsOptional()
  content: string;

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }
}
