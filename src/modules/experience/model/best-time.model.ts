import { ApiProperty } from '@nestjs/swagger';

export class BestTimeModel {
  @ApiProperty({
    description: 'Best time start',
    example: 'November'
  })
  from: string;

  @ApiProperty({
    description: 'Best time end',
    example: 'March'
  })
  to: string;
}