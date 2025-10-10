import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from '../../entities/blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { LoggerService } from '../../common/logger/logger.service';
import { PaginatedResponseDto } from '../../common/dto/paginated-response.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,  
    private readonly logger: LoggerService,
  ) {}

  async create(createBlogRequest: CreateBlogDto): Promise<Blog> {
    const startTime = Date.now();
    try {
      this.logger.info('Creating new blog', 'BlogService', { title: createBlogRequest.title });

      const createBlogDto: CreateBlogDto = {
        title: createBlogRequest.title,
        featured_media: createBlogRequest.featured_media,
        hero_media: createBlogRequest.hero_media,
        tags: createBlogRequest.tags,
        excerpt: createBlogRequest.excerpt,
        content: createBlogRequest.content?.map(c => ({
          title: c.title,
          content: c.content
        })) || [],
        region: createBlogRequest.region,
        country: createBlogRequest.country,
        city: createBlogRequest.city,
        author_name: createBlogRequest.author_name,
        about_author: createBlogRequest.about_author,
        read_time: createBlogRequest.read_time,
        active: createBlogRequest.active,
        published_at: createBlogRequest.published_at
      };

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

  async findAll(page: number = 1, limit: number = 10, region?: string): Promise<PaginatedResponseDto<Blog>> {
    const startTime = Date.now();
    try {
      this.logger.info('Fetching all blogs', 'BlogService', { page, limit, region });
      const skip = (page - 1) * limit;

      const whereCondition: any = {};
      if (region) {
        whereCondition.region = region;
      }

      const [result, total] = await this.blogRepository.findAndCount({
        where: whereCondition,
        order: { created_at: 'DESC' },
        skip,
        take: limit,
      });

      this.logger.logServiceCall('BlogService', 'findAll', Date.now() - startTime, true, { count: result.length, total });
      return new PaginatedResponseDto(result, total, page, limit);
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
        where: { id },
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

  async findByRegion(region: string, page: number = 1, limit: number = 10): Promise<PaginatedResponseDto<Blog>> {
    const skip = (page - 1) * limit;
    const [result, total] = await this.blogRepository.findAndCount({
      where: { region },
      order: { created_at: 'DESC' },
      skip,
      take: limit,
    });
    return new PaginatedResponseDto(result, total, page, limit);
  }

  async findByCountry(country: string, page: number = 1, limit: number = 10): Promise<PaginatedResponseDto<Blog>> {
    const skip = (page - 1) * limit;
    const [result, total] = await this.blogRepository.findAndCount({
      where: { country },
      order: { created_at: 'DESC' },
      skip,
      take: limit,
    });
    return new PaginatedResponseDto(result, total, page, limit);
  }

  async findByCity(city: string, page: number = 1, limit: number = 10): Promise<PaginatedResponseDto<Blog>> {
    const skip = (page - 1) * limit;
    const [result, total] = await this.blogRepository.findAndCount({
      where: { city },
      order: { created_at: 'DESC' },
      skip,
      take: limit,
    });
    return new PaginatedResponseDto(result, total, page, limit);
  }
}