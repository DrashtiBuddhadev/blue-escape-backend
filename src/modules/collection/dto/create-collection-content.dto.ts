import {
  IsString,
  IsOptional,
  IsArray,
  IsBoolean,
  ValidateNested,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class FeatureDto {
  @ApiProperty({
    description: 'Feature title',
    example: 'Beautiful Beaches'
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Feature content',
    example: 'Pristine white sand beaches with crystal clear waters'
  })
  @IsString()
  content: string;

  @ApiProperty({
    description: 'Feature images',
    example: { media: 'https://example.com/beach.jpg' }
  })
  @ValidateNested()
  @Type(() => Object)
  images: { media: string };
}

class AboutDestinationDto {
  @ApiProperty({
    description: 'About destination title',
    example: 'History'
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'About destination content',
    example: 'Rich cultural heritage spanning centuries...'
  })
  @IsString()
  content: string;
}

export class CreateCollectionContentDto {
  @ApiProperty({
    description: 'Collection ID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID()
  collection_id: string;

  @ApiProperty({
    description: 'Hero media URL',
    example: 'https://example.com/hero.jpg',
    required: false
  })
  @IsOptional()
  @IsString()
  hero_media?: string;

  @ApiProperty({
    description: 'About collection description',
    example: 'A curated collection of the best destinations in Southeast Asia',
    required: false
  })
  @IsOptional()
  @IsString()
  about_collection?: string;

  @ApiProperty({
    description: 'Collection features',
    type: [FeatureDto],
    required: false
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FeatureDto)
  features?: FeatureDto[];

  @ApiProperty({
    description: 'About destination sections',
    type: [AboutDestinationDto],
    required: false
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AboutDestinationDto)
  about_destination?: AboutDestinationDto[];

  @ApiProperty({
    description: 'Geographic region',
    example: 'Asia',
    required: false
  })
  @IsOptional()
  @IsString()
  region?: string;

  @ApiProperty({
    description: 'Country',
    example: 'Thailand',
    required: false
  })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({
    description: 'City',
    example: 'Bangkok',
    required: false
  })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({
    description: 'Whether the collection content is active',
    example: true,
    required: false
  })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}