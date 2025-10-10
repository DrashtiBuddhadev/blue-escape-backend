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
import { ExperienceService } from './experience.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { CreateExperienceRequestModel } from './model/create-experience-request.model';
import { UpdateExperienceRequestModel } from './model/update-experience-request.model';
import { ExperienceResponseModel } from './model/experience-response.model';
import { LocationFilterDto } from '../../common/dto/location-filter.dto';

@ApiTags('experiences')
@Controller({ path: 'experiences', version: '1' })
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @ApiOperation({ summary: 'Create a new experience' })
  @ApiBearerAuth()
  @ApiBody({ type: CreateExperienceDto })
  @ApiResponse({
    status: 201,
    description: 'Experience created successfully',
    type: ExperienceResponseModel
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createExperienceRequest: CreateExperienceDto) {
    return this.experienceService.create(createExperienceRequest);
  }

  @ApiOperation({ summary: 'Get all experiences with optional filtering and pagination' })
  @ApiResponse({
    status: 200,
    description: 'List of experiences retrieved successfully',
    type: [ExperienceResponseModel]
  })
  @Get()
  findAll(@Query() filters: LocationFilterDto) {
    const { page = 1, limit = 10, region } = filters;
    return this.experienceService.findAll(page, limit, region);
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
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: 'Experience ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiBody({ type: UpdateExperienceRequestModel })
  @ApiResponse({
    status: 200,
    description: 'Experience updated successfully',
    type: ExperienceResponseModel
  })
  @ApiResponse({ status: 404, description: 'Experience not found' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExperienceDto: UpdateExperienceDto) {
    return this.experienceService.update(id, updateExperienceDto);
  }

  @ApiOperation({ summary: 'Delete an experience' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: 'Experience ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiResponse({ status: 200, description: 'Experience deleted successfully' })
  @ApiResponse({ status: 404, description: 'Experience not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.experienceService.remove(id);
  }
}