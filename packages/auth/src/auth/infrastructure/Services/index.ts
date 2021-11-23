import { IHashService, ITokenService } from '../../application/Interfaces';
import { HashService } from './Hash.service';
import { TokenService } from './Token.service';

export const Services = [
  {
    provide: IHashService,
    useClass: HashService,
  },
  {
    provide: ITokenService,
    useClass: TokenService,
  },
];
