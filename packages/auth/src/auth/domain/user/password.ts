import { compare, hash } from 'bcrypt';

export class Password {
  static async create(value: string) {
    const hashed = await hash(value, 10);
    return new Password(hashed);
  }

  constructor(private readonly value: string) {}

  toString(): string {
    return this.value;
  }

  compare(value: string) {
    return compare(value, this.value);
  }
}
