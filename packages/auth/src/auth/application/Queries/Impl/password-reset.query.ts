export class PasswordResetQuery {
  constructor(public username: string) {}
}

export class PasswordResetResult {
  constructor(public token: string) {}
}
