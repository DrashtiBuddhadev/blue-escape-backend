import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody
} from '@nestjs/swagger';
import { CollectionService } from './collection.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { CreateCollectionContentDto } from './dto/create-collection-content.dto';
import { UpdateCollectionContentDto } from './dto/update-collection-content.dto';
import { CreateCollectionRequestModel } from './model/create-collection-request.model';
import { CreateCollectionContentRequestModel } from './model/create-collection-content-request.model';
import { CollectionResponseModel } from './model/collection-response.model';
import { CollectionContentResponseModel } from './model/collection-content-response.model';

@ApiTags('collections')
@Controller({ path: 'collections', version: '1' })
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @ApiOperation({ summary: 'Create a new collection' })
  @ApiBody({ type: CreateCollectionRequestModel })
  @ApiResponse({
    status: 201,
    description: 'Collection created successfully',
    type: CollectionResponseModel
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @Post()
  createCollection(@Body() createCollectionRequest: CreateCollectionRequestModel) {
    return this.collectionService.createCollection(createCollectionRequest);
  }

  @ApiOperation({ summary: 'Get all collections' })
  @ApiResponse({
    status: 200,
    description: 'List of collections retrieved successfully',
    type: [CollectionResponseModel]
  })
  @Get()
  findAllCollections() {
    return this.collectionService.findAllCollections();
  }

  @ApiOperation({ summary: 'Get a specific collection by ID' })
  @ApiParam({ name: 'id', description: 'Collection ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiResponse({
    status: 200,
    description: 'Collection retrieved successfully',
    type: CollectionResponseModel
  })
  @ApiResponse({ status: 404, description: 'Collection not found' })
  @Get(':id')
  findOneCollection(@Param('id') id: string) {
    return this.collectionService.findOneCollection(id);
  }

  @ApiOperation({ summary: 'Update a collection' })
  @ApiParam({ name: 'id', description: 'Collection ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiBody({ type: UpdateCollectionDto })
  @ApiResponse({ status: 200, description: 'Collection updated successfully' })
  @ApiResponse({ status: 404, description: 'Collection not found' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @Patch(':id')
  updateCollection(@Param('id') id: string, @Body() updateCollectionDto: UpdateCollectionDto) {
    return this.collectionService.updateCollection(id, updateCollectionDto);
  }

  @ApiOperation({ summary: 'Delete a collection' })
  @ApiParam({ name: 'id', description: 'Collection ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiResponse({ status: 200, description: 'Collection deleted successfully' })
  @ApiResponse({ status: 404, description: 'Collection not found' })
  @Delete(':id')
  removeCollection(@Param('id') id: string) {
    return this.collectionService.removeCollection(id);
  }

  @ApiOperation({ summary: 'Create collection content' })
  @ApiBody({ type: CreateCollectionContentRequestModel })
  @ApiResponse({
    status: 201,
    description: 'Collection content created successfully',
    type: CollectionContentResponseModel
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @Post('content')
  createCollectionContent(@Body() createContentRequest: CreateCollectionContentRequestModel) {
    return this.collectionService.createCollectionContent(createContentRequest);
  }

  @ApiOperation({ summary: 'Get all collection contents' })
  @ApiResponse({
    status: 200,
    description: 'List of collection contents retrieved successfully',
    type: [CollectionContentResponseModel]
  })
  @Get('content/all')
  findAllCollectionContents() {
    return this.collectionService.findAllCollectionContents();
  }

  @ApiOperation({ summary: 'Get specific collection content by ID' })
  @ApiParam({ name: 'id', description: 'Collection content ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiResponse({
    status: 200,
    description: 'Collection content retrieved successfully',
    type: CollectionContentResponseModel
  })
  @ApiResponse({ status: 404, description: 'Collection content not found' })
  @Get('content/:id')
  findOneCollectionContent(@Param('id') id: string) {
    return this.collectionService.findOneCollectionContent(id);
  }

  @ApiOperation({ summary: 'Get all contents for a specific collection' })
  @ApiParam({ name: 'id', description: 'Collection ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiResponse({
    status: 200,
    description: 'Collection contents retrieved successfully',
    type: [CollectionContentResponseModel]
  })
  @ApiResponse({ status: 404, description: 'Collection not found' })
  @Get(':id/content')
  findContentsByCollection(@Param('id') id: string) {
    return this.collectionService.findContentsByCollection(id);
  }

  @ApiOperation({ summary: 'Update collection content' })
  @ApiParam({ name: 'id', description: 'Collection content ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiBody({ type: UpdateCollectionContentDto })
  @ApiResponse({ status: 200, description: 'Collection content updated successfully' })
  @ApiResponse({ status: 404, description: 'Collection content not found' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @Patch('content/:id')
  updateCollectionContent(@Param('id') id: string, @Body() updateContentDto: UpdateCollectionContentDto) {
    return this.collectionService.updateCollectionContent(id, updateContentDto);
  }

  @ApiOperation({ summary: 'Delete collection content' })
  @ApiParam({ name: 'id', description: 'Collection content ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiResponse({ status: 200, description: 'Collection content deleted successfully' })
  @ApiResponse({ status: 404, description: 'Collection content not found' })
  @Delete('content/:id')
  removeCollectionContent(@Param('id') id: string) {
    return this.collectionService.removeCollectionContent(id);
  }
}