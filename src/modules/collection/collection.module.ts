import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collection } from '../../entities/collection.entity';
import { CollectionContent } from '../../entities/collection-content.entity';
import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller.v1';

@Module({
  imports: [TypeOrmModule.forFeature([Collection, CollectionContent])],
  controllers: [CollectionController],
  providers: [CollectionService],
  exports: [CollectionService],
})
export class CollectionModule {}