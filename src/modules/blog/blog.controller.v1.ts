import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { CreateBlogRequestModel } from './model/create-blog-request.model';
import { UpdateBlogRequestModel } from './model/update-blog-request.model';
import { BlogResponseModel } from './model/blog-response.model';
import { LocationFilterDto } from '../../common/dto/location-filter.dto';

@ApiTags('blogs')
@Controller({ path: 'blogs', version: '1' })
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @ApiOperation({ summary: 'Create a new blog post' })
  @ApiBearerAuth()
  @ApiBody({ type: CreateBlogDto })
  @ApiResponse({
    status: 201,
    description: 'Blog post created successfully',
    type: BlogResponseModel
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createBlogRequest: CreateBlogDto) {
    return this.blogService.create(createBlogRequest);
  }

  @ApiOperation({ summary: 'Get all blog posts with optional filtering and pagination' })
  @ApiResponse({
    status: 200,
    description: 'List of blog posts retrieved successfully',
    type: [BlogResponseModel]
  })
  @Get()
  findAll(@Query() filters: LocationFilterDto) {
    const { page = 1, limit = 10, region } = filters;
    return this.blogService.findAll(page, limit, region);
  }

  @ApiOperation({ summary: 'Get a specific blog post by ID' })
  @ApiParam({ name: 'id', description: 'Blog post ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiResponse({
    status: 200,
    description: 'Blog post retrieved successfully',
    type: BlogResponseModel
  })
  @ApiResponse({ status: 404, description: 'Blog post not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a blog post' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: 'Blog post ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiBody({ type: UpdateBlogRequestModel })
  @ApiResponse({
    status: 200,
    description: 'Blog post updated successfully',
    type: BlogResponseModel
  })
  @ApiResponse({ status: 404, description: 'Blog post not found' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(id, updateBlogDto);
  }

  @ApiOperation({ summary: 'Delete a blog post' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: 'Blog post ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiResponse({ status: 200, description: 'Blog post deleted successfully' })
  @ApiResponse({ status: 404, description: 'Blog post not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }
}