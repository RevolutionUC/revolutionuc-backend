export class CheckPermissionQuery {
  constructor(
    public readonly token: string,
    public readonly role: string,
    public readonly scope: string,
  ) {}
}
