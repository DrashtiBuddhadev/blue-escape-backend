import { ApiProperty } from '@nestjs/swagger';
import { ExperienceContentModel } from './experience-content.model';
import { BestTimeModel } from './best-time.model';
import { GalleryItemModel } from './gallery-item.model';

export class ExperienceResponseModel {
  @ApiProperty({
    description: 'Experience ID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id: string;

  @ApiProperty({
    description: 'Experience title',
    example: 'Island Hopping in Phi Phi'
  })
  title: string;

  @ApiProperty({
    description: 'Featured media URL',
    example: 'https://example.com/featured.jpg',
    required: false
  })
  featured_media?: string;

  @ApiProperty({
    description: 'Experience taglines',
    example: ['Discover the pristine beauty of Phi Phi Islands', 'An unforgettable island adventure'],
    required: false,
    type: [String]
  })
  taglines?: string[];

  @ApiProperty({
    description: 'Country',
    example: 'Thailand',
    required: false
  })
  country?: string;

  @ApiProperty({
    description: 'City',
    example: 'Krabi',
    required: false
  })
  city?: string;

  @ApiProperty({
    description: 'Geographic region',
    example: 'Asia',
    required: false
  })
  region?: string;

  @ApiProperty({
    description: 'Best time to visit',
    type: [BestTimeModel],
    required: false
  })
  best_time?: BestTimeModel[];

  @ApiProperty({
    description: 'Carousel media URLs',
    example: ['https://example.com/carousel1.jpg', 'https://example.com/carousel2.jpg'],
    required: false,
    type: [String]
  })
  carousel_media?: string[];

  @ApiProperty({
    description: 'Brief description of the experience',
    example: 'A magical journey through crystal clear waters',
    required: false
  })
  brief_description?: string;

  @ApiProperty({
    description: 'Experience content sections',
    type: [ExperienceContentModel],
    required: false
  })
  content?: ExperienceContentModel[];

  @ApiProperty({
    description: 'Experience tags',
    example: ['adventure', 'islands', 'nature'],
    required: false,
    type: [String]
  })
  tags?: string[];

  @ApiProperty({
    description: 'Experience gallery',
    type: [GalleryItemModel],
    required: false
  })
  gallery?: GalleryItemModel[];

  @ApiProperty({
    description: 'Experience story',
    example: 'An unforgettable adventure that will change your perspective...',
    required: false
  })
  story?: string;

  @ApiProperty({
    description: 'Experience duration in days',
    example: 3,
    required: false
  })
  duration?: number;

  @ApiProperty({
    description: 'Experience price in INR',
    example: 24999,
    required: false
  })
  price?: number;

  @ApiProperty({
    description: 'Whether the experience is active/published',
    example: true
  })
  active: boolean;

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