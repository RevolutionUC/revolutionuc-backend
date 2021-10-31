export class CreateUserCommand {
  constructor(
    public readonly username: string,
    public readonly password: string,
    public readonly role: string,
    public readonly scope: string,
  ) {}
}
