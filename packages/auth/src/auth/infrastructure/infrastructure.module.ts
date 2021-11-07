import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationModule } from '../application/application.module';
import { Role } from '../domain/role/role.entity';
import { User } from '../domain/user/user.entity';
import {
  CommandController,
  QueryController,
  EventController,
} from './Controllers';
import { ConfigProvider, ConfigService } from './Environment';

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
    TypeOrmModule.forFeature([User, Role]),
    CqrsModule,
    ApplicationModule,
  ],
  controllers: [CommandController, QueryController, EventController],
})
export class InfrastructureModule {}
