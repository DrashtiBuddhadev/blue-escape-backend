import { ApiProperty } from '@nestjs/swagger';

export class CountryResponseModel {
  @ApiProperty({
    description: 'Country ISO code',
    example: 'US'
  })
  code: string;

  @ApiProperty({
    description: 'Country name',
    example: 'United States'
  })
  name: string;
}