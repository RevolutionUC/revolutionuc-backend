export class LoginQuery {
  constructor(public username: string, public password: string) {}
}

export class LoginResult {
  constructor(public token: string) {}
}
