import { ApiProperty } from '@nestjs/swagger';

export class AboutDestinationModel {
  @ApiProperty({
    description: 'About destination description',
    example: 'Bhutan is a global pioneer. The first nation of the world to measure its success not by the strength of its economy but by the happiness of its people.'
  })
  description: string;
}