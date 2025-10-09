import { ApiProperty } from '@nestjs/swagger';

export class ContinentResponseModel {
  @ApiProperty({
    description: 'Continent code',
    example: 'AS'
  })
  code: string;

  @ApiProperty({
    description: 'Continent name',
    example: 'Asia'
  })
  name: string;
}