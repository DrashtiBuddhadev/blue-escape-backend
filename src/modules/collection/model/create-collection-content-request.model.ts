import { ApiProperty } from '@nestjs/swagger';
import { FeatureModel } from './feature.model';
import { AboutDestinationModel } from './about-destination.model';

export class CreateCollectionContentRequestModel {
  @ApiProperty({
    description: 'Collection ID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  collection_id: string;

  @ApiProperty({
    description: 'Hero media URL',
    example: 'https://example.com/hero.jpg',
    required: false
  })
  hero_media?: string;

  @ApiProperty({
    description: 'Featured image URL',
    example: 'https://example.com/featured.jpg',
    required: false
  })
  featured_img?: string;

  @ApiProperty({
    description: 'About collection description',
    example: 'A curated collection of the best destinations in Southeast Asia',
    required: false
  })
  about_collection?: string;

  @ApiProperty({
    description: 'Collection features',
    type: [FeatureModel],
    required: false
  })
  features?: FeatureModel[];

  @ApiProperty({
    description: 'About destination information',
    type: AboutDestinationModel,
    required: false
  })
  about_destination?: AboutDestinationModel;

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
    description: 'Property name',
    example: 'Amankora',
    required: false
  })
  property_name?: string;

  @ApiProperty({
    description: 'Tags for the collection',
    example: ['adventure', 'travel'],
    required: false
  })
  tags?: string[];

  @ApiProperty({
    description: 'Whether the collection content is active',
    example: true,
    required: false
  })
  active?: boolean;
}