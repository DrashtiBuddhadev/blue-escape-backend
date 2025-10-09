import {
  IsString,
  IsOptional,
  IsArray,
  IsBoolean,
  IsNumber,
  IsDateString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class BlogContentDto {
  @ApiProperty({
    description: 'Content section title',
    example: 'Introduction'
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Content section body',
    example: 'This is the content of the blog section...'
  })
  @IsString()
  content: string;
}

export class CreateBlogDto {
  @ApiProperty({
    description: 'Blog title',
    example: 'My Amazing Travel Blog'
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Featured media URL or path',
    example: 'https://example.com/image.jpg',
    required: false
  })
  @IsOptional()
  @IsString()
  featured_media?: string;

  @ApiProperty({
    description: 'Hero media URL or path',
    example: 'https://example.com/hero.jpg',
    required: false
  })
  @IsOptional()
  @IsString()
  hero_media?: string;

  @ApiProperty({
    description: 'Blog tags',
    example: ['travel', 'adventure', 'nature'],
    required: false,
    type: [String]
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiProperty({
    description: 'Blog taglines',
    example: ['Explore the world', 'Adventure awaits'],
    required: false,
    type: [String]
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tagline?: string[];

  @ApiProperty({
    description: 'Blog excerpt or summary',
    example: 'A brief summary of this amazing travel experience...',
    required: false
  })
  @IsOptional()
  @IsString()
  excerpt?: string;

  @ApiProperty({
    description: 'Blog content sections',
    type: [BlogContentDto],
    example: [{
      title: 'Introduction',
      content: 'Welcome to my travel blog...'
    }]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BlogContentDto)
  content: BlogContentDto[];

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
    description: 'Author name',
    example: 'John Doe',
    required: false
  })
  @IsOptional()
  @IsString()
  author_name?: string;

  @ApiProperty({
    description: 'About the author',
    example: 'Travel enthusiast and photographer',
    required: false
  })
  @IsOptional()
  @IsString()
  about_author?: string;

  @ApiProperty({
    description: 'Estimated read time',
    example: '5 min read',
    required: false
  })
  @IsOptional()
  @IsString()
  read_time?: string;

  @ApiProperty({
    description: 'Whether the blog is active/published',
    example: true,
    required: false,
    default: true
  })
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @ApiProperty({
    description: 'Publication date',
    example: '2024-01-15T10:00:00Z',
    required: false
  })
  @IsOptional()
  @IsDateString()
  published_at?: Date;
}