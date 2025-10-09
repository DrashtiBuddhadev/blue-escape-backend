import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagResponseModel } from './model/tag-response.model';
import { CreateTagRequestModel } from './model/create-tag-request.model';

@ApiTags('tags')
@Controller({ path: 'tags', version: '1' })
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @ApiOperation({ summary: 'Create a new tag' })
  @ApiBearerAuth()
  @ApiBody({ type: CreateTagRequestModel })
  @ApiResponse({
    status: 201,
    description: 'Tag created successfully',
    type: TagResponseModel
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 409, description: 'Tag already exists' })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @ApiOperation({ summary: 'Get all active tags' })
  @ApiResponse({
    status: 200,
    description: 'List of tags retrieved successfully',
    type: [TagResponseModel]
  })
  @Get()
  findAll() {
    return this.tagsService.findAll();
  }

  @ApiOperation({ summary: 'Get a specific tag by ID' })
  @ApiParam({ name: 'id', description: 'Tag ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiResponse({
    status: 200,
    description: 'Tag retrieved successfully',
    type: TagResponseModel
  })
  @ApiResponse({ status: 404, description: 'Tag not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagsService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a tag' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: 'Tag ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiBody({ type: UpdateTagDto })
  @ApiResponse({
    status: 200,
    description: 'Tag updated successfully',
    type: TagResponseModel
  })
  @ApiResponse({ status: 404, description: 'Tag not found' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 409, description: 'Tag name already exists' })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.update(id, updateTagDto);
  }

  @ApiOperation({ summary: 'Delete a tag (soft delete)' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: 'Tag ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiResponse({ status: 200, description: 'Tag deleted successfully' })
  @ApiResponse({ status: 404, description: 'Tag not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagsService.remove(id);
  }
}
