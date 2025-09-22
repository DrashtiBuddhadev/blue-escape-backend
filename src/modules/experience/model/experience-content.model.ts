import { ApiProperty } from '@nestjs/swagger';

export class ExperienceContentModel {
  @ApiProperty({
    description: 'Content section title',
    example: 'Activities'
  })
  title: string;

  @ApiProperty({
    description: 'Content section body',
    example: 'Enjoy various outdoor activities like hiking and swimming'
  })
  content: string;
}