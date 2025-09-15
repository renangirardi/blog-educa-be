import { IsNotEmpty, IsOptional } from 'class-validator';

export class EditPostDto {
  @IsNotEmpty()
  @IsOptional()
  title: string;

  @IsNotEmpty()
  @IsOptional()
  content: string;
}
