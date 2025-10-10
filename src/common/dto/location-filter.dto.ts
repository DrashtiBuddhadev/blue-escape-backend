import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from './pagination.dto';

export class LocationFilterDto extends PaginationQueryDto {
  @ApiProperty({
    description: 'Filter by region',
    example: 'Asia',
    required: false,
  })
  @IsOptional()
  @IsString()
  region?: string;

  @ApiProperty({
    description: 'Filter by country',
    example: 'India',
    required: false,
  })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({
    description: 'Filter by city',
    example: 'Jaipur',
    required: false,
  })
  @IsOptional()
  @IsString()
  city?: string;
}
