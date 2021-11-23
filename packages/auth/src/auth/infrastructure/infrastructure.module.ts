import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Controllers } from './Controllers';
import { ConfigProvider, ConfigService } from './Environment';
import { ApplicationModule } from '../application/application.module';
import { Services } from './Services';
import { Repositories } from './Repositories';
import { RoleRepository } from './Repositories/Role.repository';
import { UserRepository } from './Repositories/User.repository';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        url: configService.get(`DATABASE_URL`),
        synchronize: configService.get(`production`) !== 'true',
        logging: configService.get(`production`) !== 'true',
        ssl: {
          rejectUnauthorized: false,
        },
      }),
      inject: [ConfigProvider],
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('CRYPTO_KEY'),
      }),
      inject: [ConfigProvider],
    }),
    TypeOrmModule.forFeature([UserRepository, RoleRepository]),
    CqrsModule,
    ApplicationModule,
  ],
  controllers: [...Controllers],
  providers: [...Repositories, ...Services],
})
export class InfrastructureModule {}
