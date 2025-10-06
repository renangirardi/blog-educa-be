export class ListUsersDto {
  constructor(
    readonly id: string,
    readonly username: string,
    readonly profile: string,
  ) {}
}
