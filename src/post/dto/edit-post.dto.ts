import { IsOptional, IsString } from 'class-validator';

export class EditPostDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  content: string;

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }
}
