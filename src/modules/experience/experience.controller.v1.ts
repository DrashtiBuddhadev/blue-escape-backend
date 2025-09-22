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
import { ExperienceService } from './experience.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { CreateExperienceRequestModel } from './model/create-experience-request.model';
import { UpdateExperienceRequestModel } from './model/update-experience-request.model';
import { ExperienceResponseModel } from './model/experience-response.model';

@ApiTags('experiences')
@Controller({ path: 'experiences', version: '1' })
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @ApiOperation({ summary: 'Create a new experience' })
  @ApiBody({ type: CreateExperienceRequestModel })
  @ApiResponse({
    status: 201,
    description: 'Experience created successfully',
    type: ExperienceResponseModel
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @Post()
  create(@Body() createExperienceRequest: CreateExperienceRequestModel) {
    return this.experienceService.create(createExperienceRequest);
  }

  @ApiOperation({ summary: 'Get all experiences with optional filtering' })
  @ApiQuery({ name: 'region', required: false, description: 'Filter by region', example: 'Asia' })
  @ApiQuery({ name: 'country', required: false, description: 'Filter by country', example: 'Thailand' })
  @ApiQuery({ name: 'city', required: false, description: 'Filter by city', example: 'Krabi' })
  @ApiQuery({ name: 'tag', required: false, description: 'Filter by tag', example: 'adventure' })
  @ApiResponse({
    status: 200,
    description: 'List of experiences retrieved successfully',
    type: [ExperienceResponseModel]
  })
  @Get()
  findAll(
    @Query('region') region?: string,
    @Query('country') country?: string,
    @Query('city') city?: string,
    @Query('tag') tag?: string,
  ) {
    if (region) {
      return this.experienceService.findByRegion(region);
    }
    if (country) {
      return this.experienceService.findByCountry(country);
    }
    if (city) {
      return this.experienceService.findByCity(city);
    }
    if (tag) {
      return this.experienceService.findByTag(tag);
    }
    return this.experienceService.findAll();
  }

  @ApiOperation({ summary: 'Get a specific experience by ID' })
  @ApiParam({ name: 'id', description: 'Experience ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiResponse({
    status: 200,
    description: 'Experience retrieved successfully',
    type: ExperienceResponseModel
  })
  @ApiResponse({ status: 404, description: 'Experience not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.experienceService.findOne(id);
  }

  @ApiOperation({ summary: 'Update an experience' })
  @ApiParam({ name: 'id', description: 'Experience ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiBody({ type: UpdateExperienceRequestModel })
  @ApiResponse({
    status: 200,
    description: 'Experience updated successfully',
    type: ExperienceResponseModel
  })
  @ApiResponse({ status: 404, description: 'Experience not found' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExperienceRequest: UpdateExperienceRequestModel) {
    return this.experienceService.update(id, updateExperienceRequest);
  }

  @ApiOperation({ summary: 'Delete an experience' })
  @ApiParam({ name: 'id', description: 'Experience ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiResponse({ status: 200, description: 'Experience deleted successfully' })
  @ApiResponse({ status: 404, description: 'Experience not found' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.experienceService.remove(id);
  }
}