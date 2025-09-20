import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { BlogModule } from './modules/blog/blog.module';
import { CollectionModule } from './modules/collection/collection.module';
import { ExperienceModule } from './modules/experience/experience.module';
import { LoggerModule } from './common/logger/logger.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import databaseConfig from './config/database.config';
import loggerConfig from './config/logger.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, loggerConfig],
    }),
    LoggerModule,
    DatabaseModule,
    BlogModule,
    CollectionModule,
    ExperienceModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
