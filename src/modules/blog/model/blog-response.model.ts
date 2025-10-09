import { ApiProperty } from '@nestjs/swagger';
import { BlogContentModel } from './blog-content.model';

export class BlogResponseModel {
  @ApiProperty({
    description: 'Blog ID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id: string;

  @ApiProperty({
    description: 'Blog title',
    example: 'My Amazing Travel Blog'
  })
  title: string;

  @ApiProperty({
    description: 'Featured media URL or path',
    example: 'https://example.com/image.jpg',
    required: false
  })
  featured_media?: string;

  @ApiProperty({
    description: 'Hero media URL or path',
    example: 'https://example.com/hero.jpg',
    required: false
  })
  hero_media?: string;

  @ApiProperty({
    description: 'Blog tags',
    example: ['travel', 'adventure', 'nature'],
    required: false,
    type: [String]
  })
  tags?: string[];

  @ApiProperty({
    description: 'Blog taglines',
    example: ['Explore the world', 'Adventure awaits'],
    required: false,
    type: [String]
  })
  tagline?: string[];

  @ApiProperty({
    description: 'Blog excerpt or summary',
    example: 'A brief summary of this amazing travel experience...',
    required: false
  })
  excerpt?: string;

  @ApiProperty({
    description: 'Blog content sections',
    type: [BlogContentModel],
    example: [{
      title: 'Introduction',
      content: 'Welcome to my travel blog...'
    }]
  })
  content: BlogContentModel[];

  @ApiProperty({
    description: 'Geographic region',
    example: 'Asia',
    required: false
  })
  region?: string;

  @ApiProperty({
    description: 'Country',
    example: 'Thailand',
    required: false
  })
  country?: string;

  @ApiProperty({
    description: 'City',
    example: 'Bangkok',
    required: false
  })
  city?: string;

  @ApiProperty({
    description: 'Author name',
    example: 'John Doe',
    required: false
  })
  author_name?: string;

  @ApiProperty({
    description: 'About the author',
    example: 'Travel enthusiast and photographer',
    required: false
  })
  about_author?: string;

  @ApiProperty({
    description: 'Estimated read time',
    example: '5 min read',
    required: false
  })
  read_time?: string;

  @ApiProperty({
    description: 'Whether the blog is active/published',
    example: true
  })
  active: boolean;

  @ApiProperty({
    description: 'Publication date',
    example: '2024-01-15T10:00:00Z',
    required: false
  })
  published_at?: Date;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2024-01-15T10:00:00Z'
  })
  created_at: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2024-01-15T10:00:00Z'
  })
  updated_at: Date;
}