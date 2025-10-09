import {
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
  IsBoolean,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class ExperienceContentDto {
  @ApiProperty({
    description: 'Content section title',
    example: 'Activities'
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Content section body',
    example: 'Enjoy various outdoor activities like hiking and swimming'
  })
  @IsString()
  content: string;
}

class BestTimeDto {
  @ApiProperty({
    description: 'Best time start',
    example: 'November'
  })
  @IsString()
  from: string;

  @ApiProperty({
    description: 'Best time end',
    example: 'March'
  })
  @IsString()
  to: string;
}

class GalleryItemDto {
  @ApiProperty({
    description: 'Gallery item name',
    example: 'Sunset View'
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Gallery item image URL',
    example: 'https://example.com/sunset.jpg'
  })
  @IsString()
  image: string;
}

export class CreateExperienceDto {
  @ApiProperty({
    description: 'Experience title',
    example: 'Island Hopping in Phi Phi'
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Featured media URL',
    example: 'https://example.com/featured.jpg',
    required: false
  })
  @IsOptional()
  @IsString()
  featured_media?: string;

  @ApiProperty({
    description: 'Experience taglines',
    example: ['Discover the pristine beauty of Phi Phi Islands', 'An unforgettable island adventure'],
    required: false,
    type: [String]
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  taglines?: string[];

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
    example: 'Krabi',
    required: false
  })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({
    description: 'Geographic region',
    example: 'Asia',
    required: false
  })
  @IsOptional()
  @IsString()
  region?: string;

  @ApiProperty({
    description: 'Best time to visit',
    type: [BestTimeDto],
    required: false
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BestTimeDto)
  best_time?: BestTimeDto[];

  @ApiProperty({
    description: 'Carousel media URLs',
    example: ['https://example.com/carousel1.jpg', 'https://example.com/carousel2.jpg'],
    required: false,
    type: [String]
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  carousel_media?: string[];

  @ApiProperty({
    description: 'Brief description of the experience',
    example: 'A magical journey through crystal clear waters',
    required: false
  })
  @IsOptional()
  @IsString()
  brief_description?: string;

  @ApiProperty({
    description: 'Experience content sections',
    type: [ExperienceContentDto],
    required: false
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExperienceContentDto)
  content?: ExperienceContentDto[];

  @ApiProperty({
    description: 'Experience tags',
    example: ['adventure', 'islands', 'nature'],
    required: false,
    type: [String]
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiProperty({
    description: 'Experience gallery',
    type: [GalleryItemDto],
    required: false
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GalleryItemDto)
  gallery?: GalleryItemDto[];

  @ApiProperty({
    description: 'Experience story',
    example: 'An unforgettable adventure that will change your perspective...',
    required: false
  })
  @IsOptional()
  @IsString()
  story?: string;

  @ApiProperty({
    description: 'Experience duration in days',
    example: 3,
    required: false
  })
  @IsOptional()
  @IsNumber()
  duration?: number;

  @ApiProperty({
    description: 'Experience price in INR',
    example: 24999,
    required: false
  })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({
    description: 'Whether the experience is active/published',
    example: true,
    required: false,
    default: true
  })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}