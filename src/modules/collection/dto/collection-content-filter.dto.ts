import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { LocationFilterDto } from '../../../common/dto/location-filter.dto';

export class CollectionContentFilterDto extends LocationFilterDto {
  @ApiProperty({
    description: 'Filter by tags (single or multiple)',
    example: ['luxury', 'adventure'],
    required: false,
    isArray: true,
    type: [String],
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value;
    return value ? [value] : undefined;
  })
  @IsString({ each: true })
  tags?: string[];
}
