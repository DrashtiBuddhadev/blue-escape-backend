import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { CreateCollectionContentDto } from './dto/create-collection-content.dto';
import { UpdateCollectionContentDto } from './dto/update-collection-content.dto';

@Controller({ path: 'collections', version: '1' })
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Post()
  createCollection(@Body() createCollectionDto: CreateCollectionDto) {
    return this.collectionService.createCollection(createCollectionDto);
  }

  @Get()
  findAllCollections() {
    return this.collectionService.findAllCollections();
  }

  @Get(':id')
  findOneCollection(@Param('id') id: string) {
    return this.collectionService.findOneCollection(id);
  }

  @Patch(':id')
  updateCollection(@Param('id') id: string, @Body() updateCollectionDto: UpdateCollectionDto) {
    return this.collectionService.updateCollection(id, updateCollectionDto);
  }

  @Delete(':id')
  removeCollection(@Param('id') id: string) {
    return this.collectionService.removeCollection(id);
  }

  @Post('content')
  createCollectionContent(@Body() createContentDto: CreateCollectionContentDto) {
    return this.collectionService.createCollectionContent(createContentDto);
  }

  @Get('content/all')
  findAllCollectionContents() {
    return this.collectionService.findAllCollectionContents();
  }

  @Get('content/:id')
  findOneCollectionContent(@Param('id') id: string) {
    return this.collectionService.findOneCollectionContent(id);
  }

  @Get(':id/content')
  findContentsByCollection(@Param('id') id: string) {
    return this.collectionService.findContentsByCollection(id);
  }

  @Patch('content/:id')
  updateCollectionContent(@Param('id') id: string, @Body() updateContentDto: UpdateCollectionContentDto) {
    return this.collectionService.updateCollectionContent(id, updateContentDto);
  }

  @Delete('content/:id')
  removeCollectionContent(@Param('id') id: string) {
    return this.collectionService.removeCollectionContent(id);
  }
}