import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { BlogModule } from './modules/blog/blog.module';
import { CollectionModule } from './modules/collection/collection.module';
import { ExperienceModule } from './modules/experience/experience.module';
import { LocationModule } from './modules/location/location.module';
import { ContactModule } from './modules/contact/contact.module';
import { TagsModule } from './modules/tags/tags.module';
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
    AuthModule,
    BlogModule,
    CollectionModule,
    ExperienceModule,
    LocationModule,
    ContactModule,
    TagsModule,
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
