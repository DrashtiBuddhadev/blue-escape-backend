import { ApiProperty } from '@nestjs/swagger';

export class AboutDestinationModel {
  @ApiProperty({
    description: 'About destination title',
    example: 'History'
  })
  title: string;

  @ApiProperty({
    description: 'About destination content',
    example: 'Rich cultural heritage spanning centuries...'
  })
  content: string;
}