import { ApiProperty } from '@nestjs/swagger';

export class FeatureModel {
  @ApiProperty({
    description: 'Feature title',
    example: 'Beautiful Beaches'
  })
  title: string;

  @ApiProperty({
    description: 'Feature content',
    example: 'Pristine white sand beaches with crystal clear waters'
  })
  content: string;

  @ApiProperty({
    description: 'Feature images',
    example: { media: 'https://example.com/beach.jpg' }
  })
  images: { media: string };
}