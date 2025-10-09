import { ApiProperty } from '@nestjs/swagger';

export class CityResponseModel {
  @ApiProperty({
    description: 'City name',
    example: 'New York'
  })
  name: string;

  @ApiProperty({
    description: 'Country code',
    example: 'US'
  })
  countryCode: string;
}