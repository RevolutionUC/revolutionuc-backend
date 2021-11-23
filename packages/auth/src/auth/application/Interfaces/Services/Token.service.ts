export interface TokenPayload {
  userId: string;
}

export interface ITokenService {
  generateToken(payload: TokenPayload): Promise<string>;
  validateToken(token: string): Promise<TokenPayload>;
}

export const ITokenService = Symbol('ITokenService');
