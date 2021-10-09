import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ENV } from './environment';
import { JudgingModule } from './judging/judging.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        url: configService.get(ENV.DATABASE_URL),
        synchronize: configService.get(ENV.production) !== 'true',
        logging: configService.get(ENV.production) !== 'true',
        ssl: {
          rejectUnauthorized: false,
        },
      }),
      inject: [ConfigService],
    }),
    JudgingModule,
    AuthModule,
  ],
})
export class AppModule {}
