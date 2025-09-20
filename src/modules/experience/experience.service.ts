import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Experience } from '../../entities/experience.entity';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { LoggerService } from '../../common/logger/logger.service';

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

  async findAll(): Promise<Experience[]> {
    return await this.experienceRepository.find({
      order: { created_at: 'DESC' },
    });
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

  async findByRegion(region: string): Promise<Experience[]> {
    return await this.experienceRepository.find({
      where: { region },
      order: { created_at: 'DESC' },
    });
  }

  async findByCountry(country: string): Promise<Experience[]> {
    return await this.experienceRepository.find({
      where: { country },
      order: { created_at: 'DESC' },
    });
  }

  async findByCity(city: string): Promise<Experience[]> {
    return await this.experienceRepository.find({
      where: { city },
      order: { created_at: 'DESC' },
    });
  }

  async findByTag(tag: string): Promise<Experience[]> {
    return await this.experienceRepository
      .createQueryBuilder('experience')
      .where('JSON_CONTAINS(experience.tags, :tag)', { tag: `"${tag}"` })
      .orderBy('experience.created_at', 'DESC')
      .getMany();
  }
}