export class ListPostsDto {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly content: string,
    readonly author: string,
  ) {}
}
