import { ApiProperty } from '@nestjs/swagger';
import { ExperienceContentModel } from './experience-content.model';
import { BestTimeModel } from './best-time.model';
import { GalleryItemModel } from './gallery-item.model';

export class UpdateExperienceRequestModel {
  @ApiProperty({
    description: 'Experience title',
    example: 'Island Hopping in Phi Phi',
    required: false
  })
  title?: string;

  @ApiProperty({
    description: 'Featured media URL',
    example: 'https://example.com/featured.jpg',
    required: false
  })
  featured_media?: string;

  @ApiProperty({
    description: 'Experience excerpt',
    example: 'Discover the pristine beauty of Phi Phi Islands',
    required: false
  })
  excerpt?: string;

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
    description: 'Carousel media URL',
    example: 'https://example.com/carousel.jpg',
    required: false
  })
  carousel_media?: string;

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
}