import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection } from '../../entities/collection.entity';
import { CollectionContent } from '../../entities/collection-content.entity';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { CreateCollectionContentDto } from './dto/create-collection-content.dto';
import { UpdateCollectionContentDto } from './dto/update-collection-content.dto';

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

  async findAllCollections(): Promise<Collection[]> {
    return await this.collectionRepository.find({
      relations: ['contents'],
      order: { created_at: 'DESC' },
    });
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

  async findAllCollectionContents(): Promise<CollectionContent[]> {
    return await this.collectionContentRepository.find({
      where: { active: true },
      relations: ['collection'],
      order: { created_at: 'DESC' },
    });
  }

  async findOneCollectionContent(id: string): Promise<CollectionContent> {
    const content = await this.collectionContentRepository.findOne({
      where: { id, active: true },
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
      where: { collection_id: collectionId, active: true },
      relations: ['collection'],
      order: { created_at: 'DESC' },
    });
  }
}