import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigProvider, ConfigService } from './infrastructure/Environment';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

@Module({
  imports: [
    InfrastructureModule,
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
  ],
  providers: [ConfigProvider],
})
export class JudgingModule {}
