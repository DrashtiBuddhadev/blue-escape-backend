import { ApiProperty } from '@nestjs/swagger';

export class GalleryItemModel {
  @ApiProperty({
    description: 'Gallery item name',
    example: 'Sunset View'
  })
  name: string;

  @ApiProperty({
    description: 'Gallery item image URL',
    example: 'https://example.com/sunset.jpg'
  })
  image: string;
}