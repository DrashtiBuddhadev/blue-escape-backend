import {
  IsString,
  IsOptional,
  IsArray,
  IsBoolean,
  ValidateNested,
  IsUUID,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class FeatureImagesDto {
  @ApiProperty({
    description: 'Media URL',
    example: ['https://example.com/beach.jpg', 'https://example.com/beach2.jpg']
  })
  @IsArray()
  @IsString({ each: true })
  media: string[];
}

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
    example: { media: ['https://example.com/beach.jpg', 'https://example.com/beach2.jpg'] }
  })
  @ValidateNested()
  @Type(() => FeatureImagesDto)
  images: FeatureImagesDto;
}

class AboutDestinationDto {
  @ApiProperty({
    description: 'About destination description',
    example: 'Bhutan is a global pioneer. The first nation of the world to measure its success not by the strength of its economy but by the happiness of its people.'
  })
  @IsString()
  description: string;
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
    description: 'Featured image URL',
    example: 'https://example.com/featured.jpg',
    required: false
  })
  @IsOptional()
  @IsString()
  featured_img?: string;

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
    description: 'About destination information',
    type: AboutDestinationDto,
    required: false
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => AboutDestinationDto)
  about_destination?: AboutDestinationDto;

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
    description: 'Property name',
    example: 'Amankora',
    required: false
  })
  @IsOptional()
  @IsString()
  property_name?: string;

  @ApiProperty({
    description: 'Tags for the collection',
    example: ['adventure', 'travel'],
    required: false
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiProperty({
    description: 'Whether the collection content is active',
    example: true,
    required: false
  })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}