import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from '../../entities/blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { LoggerService } from '../../common/logger/logger.service';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
    private readonly logger: LoggerService,
  ) {}

  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    const startTime = Date.now();
    try {
      this.logger.info('Creating new blog', 'BlogService', { title: createBlogDto.title });
      const blog = this.blogRepository.create(createBlogDto);
      const result = await this.blogRepository.save(blog);
      this.logger.logServiceCall('BlogService', 'create', Date.now() - startTime, true, { blogId: result.id });
      return result;
    } catch (error) {
      this.logger.logError(error, 'BlogService.create');
      this.logger.logServiceCall('BlogService', 'create', Date.now() - startTime, false);
      throw error;
    }
  }

  async findAll(): Promise<Blog[]> {
    const startTime = Date.now();
    try {
      this.logger.info('Fetching all blogs', 'BlogService');
      const result = await this.blogRepository.find({
        where: { active: true },
        order: { created_at: 'DESC' },
      });
      this.logger.logServiceCall('BlogService', 'findAll', Date.now() - startTime, true, { count: result.length });
      return result;
    } catch (error) {
      this.logger.logError(error, 'BlogService.findAll');
      this.logger.logServiceCall('BlogService', 'findAll', Date.now() - startTime, false);
      throw error;
    }
  }

  async findOne(id: string): Promise<Blog> {
    const startTime = Date.now();
    try {
      this.logger.info('Fetching blog by ID', 'BlogService', { blogId: id });
      const blog = await this.blogRepository.findOne({
        where: { id, active: true },
      });

      if (!blog) {
        this.logger.warn(`Blog with ID "${id}" not found`, 'BlogService');
        throw new NotFoundException(`Blog with ID "${id}" not found`);
      }

      this.logger.logServiceCall('BlogService', 'findOne', Date.now() - startTime, true, { blogId: id });
      return blog;
    } catch (error) {
      this.logger.logError(error, 'BlogService.findOne');
      this.logger.logServiceCall('BlogService', 'findOne', Date.now() - startTime, false);
      throw error;
    }
  }

  async update(id: string, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    const blog = await this.findOne(id);
    Object.assign(blog, updateBlogDto);
    return await this.blogRepository.save(blog);
  }

  async remove(id: string): Promise<void> {
    const blog = await this.findOne(id);
    blog.active = false;
    await this.blogRepository.save(blog);
  }

  async findByRegion(region: string): Promise<Blog[]> {
    return await this.blogRepository.find({
      where: { region, active: true },
      order: { created_at: 'DESC' },
    });
  }

  async findByCountry(country: string): Promise<Blog[]> {
    return await this.blogRepository.find({
      where: { country, active: true },
      order: { created_at: 'DESC' },
    });
  }

  async findByCity(city: string): Promise<Blog[]> {
    return await this.blogRepository.find({
      where: { city, active: true },
      order: { created_at: 'DESC' },
    });
  }
}