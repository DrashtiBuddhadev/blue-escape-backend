import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Experience } from '../../entities/experience.entity';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { LoggerService } from '../../common/logger/logger.service';
import { PaginatedResponseDto } from '../../common/dto/paginated-response.dto';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectRepository(Experience)
    private readonly experienceRepository: Repository<Experience>,
    private readonly logger: LoggerService,
  ) {}

  async create(createExperienceDto: CreateExperienceDto): Promise<Experience> {
    const startTime = Date.now();
    try {
      this.logger.info('Creating new experience', 'ExperienceService', { title: createExperienceDto.title });
      const experience = this.experienceRepository.create(createExperienceDto);
      const result = await this.experienceRepository.save(experience);
      this.logger.logServiceCall('ExperienceService', 'create', Date.now() - startTime, true, { experienceId: result.id });
      return result;
    } catch (error) {
      this.logger.logError(error, 'ExperienceService.create');
      this.logger.logServiceCall('ExperienceService', 'create', Date.now() - startTime, false);
      throw error;
    }
  }

  async findAll(page: number = 1, limit: number = 10, region?: string): Promise<PaginatedResponseDto<Experience>> {
    const skip = (page - 1) * limit;

    const queryBuilder = this.experienceRepository
      .createQueryBuilder('experience')
      .orderBy('experience.created_at', 'DESC')
      .skip(skip)
      .take(limit);

    if (region) {
      queryBuilder.andWhere('experience.region = :region', { region });
    }

    const [result, total] = await queryBuilder.getManyAndCount();
    return new PaginatedResponseDto(result, total, page, limit);
  }

  async findOne(id: string): Promise<Experience> {
    const experience = await this.experienceRepository.findOne({
      where: { id },
    });

    if (!experience) {
      throw new NotFoundException(`Experience with ID "${id}" not found`);
    }

    return experience;
  }

  async update(id: string, updateExperienceDto: UpdateExperienceDto): Promise<Experience> {
    const experience = await this.findOne(id);
    Object.assign(experience, updateExperienceDto);
    return await this.experienceRepository.save(experience);
  }

  async remove(id: string): Promise<void> {
    const experience = await this.findOne(id);
    await this.experienceRepository.remove(experience);
  }

  async findByRegion(region: string, page: number = 1, limit: number = 10): Promise<PaginatedResponseDto<Experience>> {
    const skip = (page - 1) * limit;
    const [result, total] = await this.experienceRepository.findAndCount({
      where: { region },
      order: { created_at: 'DESC' },
      skip,
      take: limit,
    });
    return new PaginatedResponseDto(result, total, page, limit);
  }

  async findByCountry(country: string, page: number = 1, limit: number = 10): Promise<PaginatedResponseDto<Experience>> {
    const skip = (page - 1) * limit;
    const [result, total] = await this.experienceRepository.findAndCount({
      where: { country },
      order: { created_at: 'DESC' },
      skip,
      take: limit,
    });
    return new PaginatedResponseDto(result, total, page, limit);
  }

  async findByCity(city: string, page: number = 1, limit: number = 10): Promise<PaginatedResponseDto<Experience>> {
    const skip = (page - 1) * limit;
    const [result, total] = await this.experienceRepository.findAndCount({
      where: { city },
      order: { created_at: 'DESC' },
      skip,
      take: limit,
    });
    return new PaginatedResponseDto(result, total, page, limit);
  }

  async findByTag(tag: string, page: number = 1, limit: number = 10): Promise<PaginatedResponseDto<Experience>> {
    const skip = (page - 1) * limit;
    const [result, total] = await this.experienceRepository
      .createQueryBuilder('experience')
      .where('JSON_CONTAINS(experience.tags, :tag)', { tag: `"${tag}"` })
      .orderBy('experience.created_at', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();
    return new PaginatedResponseDto(result, total, page, limit);
  }
}