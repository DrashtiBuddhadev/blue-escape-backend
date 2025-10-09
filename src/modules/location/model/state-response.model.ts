import { ApiProperty } from '@nestjs/swagger';

export class StateResponseModel {
  @ApiProperty({
    description: 'State ISO code',
    example: 'NY'
  })
  isoCode: string;

  @ApiProperty({
    description: 'State name',
    example: 'New York'
  })
  name: string;

  @ApiProperty({
    description: 'Country code',
    example: 'US'
  })
  countryCode: string;

  @ApiProperty({
    description: 'State latitude',
    example: '42.9538'
  })
  latitude: string;

  @ApiProperty({
    description: 'State longitude',
    example: '-75.5268'
  })
  longitude: string;
}