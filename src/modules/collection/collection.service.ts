import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection } from '../../entities/collection.entity';
import { CollectionContent } from '../../entities/collection-content.entity';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { CreateCollectionContentDto } from './dto/create-collection-content.dto';
import { UpdateCollectionContentDto } from './dto/update-collection-content.dto';
import { PaginatedResponseDto } from '../../common/dto/paginated-response.dto';

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionRepository: Repository<Collection>,
    @InjectRepository(CollectionContent)
    private readonly collectionContentRepository: Repository<CollectionContent>,
  ) {}

  async createCollection(createCollectionDto: CreateCollectionDto): Promise<Collection> {
    const collection = this.collectionRepository.create(createCollectionDto);
    return await this.collectionRepository.save(collection);
  }

  async findAllCollections(
    page: number = 1,
    limit: number = 10,
    region?: string,
    country?: string,
    city?: string,
    tags?: string[],
  ): Promise<PaginatedResponseDto<Collection>> {
    const skip = (page - 1) * limit;

    const queryBuilder = this.collectionRepository
      .createQueryBuilder('collection')
      .leftJoinAndSelect('collection.contents', 'contents')
      .orderBy('collection.created_at', 'DESC');

    // Apply location and tags filters if provided
    if (region || country || city || (tags && tags.length > 0)) {
      queryBuilder.where((qb) => {
        const subQuery = qb
          .subQuery()
          .select('cc.collection_id')
          .from('collection_contents', 'cc')
          .where('cc.active = :active', { active: true });

        if (region) {
          subQuery.andWhere('cc.region = :region', { region });
        }
        if (country) {
          subQuery.andWhere('cc.country = :country', { country });
        }
        if (city) {
          subQuery.andWhere('cc.city = :city', { city });
        }
        if (tags && tags.length > 0) {
          tags.forEach((tag, index) => {
            subQuery.andWhere(`JSON_CONTAINS(cc.tags, :tag${index})`, {
              [`tag${index}`]: `"${tag}"`,
            });
          });
        }

        return 'collection.id IN ' + subQuery.getQuery();
      });
    }

    queryBuilder.skip(skip).take(limit);

    const [result, total] = await queryBuilder.getManyAndCount();
    return new PaginatedResponseDto(result, total, page, limit);
  }

  async findOneCollection(id: string): Promise<Collection> {
    const collection = await this.collectionRepository.findOne({
      where: { id },
      relations: ['contents'],
    });

    if (!collection) {
      throw new NotFoundException(`Collection with ID "${id}" not found`);
    }

    return collection;
  }

  async updateCollection(id: string, updateCollectionDto: UpdateCollectionDto): Promise<Collection> {
    const collection = await this.findOneCollection(id);
    Object.assign(collection, updateCollectionDto);
    return await this.collectionRepository.save(collection);
  }

  async removeCollection(id: string): Promise<void> {
    const collection = await this.findOneCollection(id);
    await this.collectionRepository.remove(collection);
  }

  async createCollectionContent(createContentDto: CreateCollectionContentDto): Promise<CollectionContent> {
    const collection = await this.findOneCollection(createContentDto.collection_id);
    const content = this.collectionContentRepository.create({
      ...createContentDto,
      collection,
    });
    return await this.collectionContentRepository.save(content);
  }

  async findAllCollectionContents(
    page: number = 1,
    limit: number = 10,
    region?: string,
    country?: string,
    city?: string,
    tags?: string[],
  ): Promise<PaginatedResponseDto<CollectionContent>> {
    const skip = (page - 1) * limit;

    const queryBuilder = this.collectionContentRepository
      .createQueryBuilder('content')
      .leftJoinAndSelect('content.collection', 'collection')
      .where('content.active = :active', { active: true })
      .orderBy('content.created_at', 'DESC')
      .skip(skip)
      .take(limit);

    if (region) {
      queryBuilder.andWhere('content.region = :region', { region });
    }

    if (country) {
      queryBuilder.andWhere('content.country = :country', { country });
    }

    if (city) {
      queryBuilder.andWhere('content.city = :city', { city });
    }

    if (tags && tags.length > 0) {
      tags.forEach((tag, index) => {
        queryBuilder.andWhere(`JSON_CONTAINS(content.tags, :tag${index})`, {
          [`tag${index}`]: `"${tag}"`,
        });
      });
    }

    const [result, total] = await queryBuilder.getManyAndCount();
    return new PaginatedResponseDto(result, total, page, limit);
  }

  async findOneCollectionContent(id: string): Promise<CollectionContent> {
    const content = await this.collectionContentRepository.findOne({
      where: { id },
      relations: ['collection'],
    });

    if (!content) {
      throw new NotFoundException(`Collection content with ID "${id}" not found`);
    }

    return content;
  }

  async updateCollectionContent(id: string, updateContentDto: UpdateCollectionContentDto): Promise<CollectionContent> {
    const content = await this.findOneCollectionContent(id);
    Object.assign(content, updateContentDto);
    return await this.collectionContentRepository.save(content);
  }

  async removeCollectionContent(id: string): Promise<void> {
    const content = await this.findOneCollectionContent(id);
    content.active = false;
    await this.collectionContentRepository.save(content);
  }

  async findContentsByCollection(collectionId: string): Promise<CollectionContent[]> {
    return await this.collectionContentRepository.find({
      where: { collection_id: collectionId },
      relations: ['collection'],
      order: { created_at: 'DESC' },
    });
  }

  async getAvailableLocations(
    region?: string,
    country?: string,
  ): Promise<{ regions: string[]; countries: string[]; cities: string[] }> {
    const queryBuilder = this.collectionContentRepository
      .createQueryBuilder('content')
      .select('content.region', 'region')
      .addSelect('content.country', 'country')
      .addSelect('content.city', 'city')
      .where('content.active = :active', { active: true });

    // Apply filters if provided
    if (region) {
      queryBuilder.andWhere('content.region = :region', { region });
    }
    if (country) {
      queryBuilder.andWhere('content.country = :country', { country });
    }

    const results = await queryBuilder.getRawMany();

    const regions = [...new Set(results.map(r => r.region).filter(Boolean))];
    const countries = [...new Set(results.map(r => r.country).filter(Boolean))];
    const cities = [...new Set(results.map(r => r.city).filter(Boolean))];

    return {
      regions: regions.sort(),
      countries: countries.sort(),
      cities: cities.sort(),
    };
  }
}