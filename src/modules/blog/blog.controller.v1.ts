import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody
} from '@nestjs/swagger';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { CreateBlogRequestModel } from './model/create-blog-request.model';
import { UpdateBlogRequestModel } from './model/update-blog-request.model';
import { BlogResponseModel } from './model/blog-response.model';

@ApiTags('blogs')
@Controller({ path: 'blogs', version: '1' })
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @ApiOperation({ summary: 'Create a new blog post' })
  @ApiBody({ type: CreateBlogRequestModel })
  @ApiResponse({
    status: 201,
    description: 'Blog post created successfully',
    type: BlogResponseModel
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @Post()
  create(@Body() createBlogRequest: CreateBlogRequestModel) {
    return this.blogService.create(createBlogRequest);
  }

  @ApiOperation({ summary: 'Get all blog posts with optional filtering' })
  @ApiQuery({ name: 'region', required: false, description: 'Filter by region', example: 'Asia' })
  @ApiQuery({ name: 'country', required: false, description: 'Filter by country', example: 'Thailand' })
  @ApiQuery({ name: 'city', required: false, description: 'Filter by city', example: 'Bangkok' })
  @ApiResponse({
    status: 200,
    description: 'List of blog posts retrieved successfully',
    type: [BlogResponseModel]
  })
  @Get()
  findAll(@Query('region') region?: string, @Query('country') country?: string, @Query('city') city?: string) {
    if (region) {
      return this.blogService.findByRegion(region);
    }
    if (country) {
      return this.blogService.findByCountry(country);
    }
    if (city) {
      return this.blogService.findByCity(city);
    }
    return this.blogService.findAll();
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
  @ApiParam({ name: 'id', description: 'Blog post ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiBody({ type: UpdateBlogRequestModel })
  @ApiResponse({
    status: 200,
    description: 'Blog post updated successfully',
    type: BlogResponseModel
  })
  @ApiResponse({ status: 404, description: 'Blog post not found' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogRequest: UpdateBlogRequestModel) {
    return this.blogService.update(id, updateBlogRequest);
  }

  @ApiOperation({ summary: 'Delete a blog post' })
  @ApiParam({ name: 'id', description: 'Blog post ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiResponse({ status: 200, description: 'Blog post deleted successfully' })
  @ApiResponse({ status: 404, description: 'Blog post not found' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }
}