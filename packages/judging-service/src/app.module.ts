import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { environment } from './environment';
import { JudgingModule } from './judging/judging.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: environment.database_config.url,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: environment.database_config.synchronize,
      logging: environment.database_config.logging,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    JudgingModule,
    AuthModule,
  ],
})
export class AppModule {}
