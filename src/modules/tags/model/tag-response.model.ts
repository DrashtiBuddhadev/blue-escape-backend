import { ApiProperty } from '@nestjs/swagger';

export class TagResponseModel {
  @ApiProperty({
    description: 'Tag ID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id: string;

  @ApiProperty({
    description: 'Tag name',
    example: 'Natural Retreat'
  })
  name: string;

  @ApiProperty({
    description: 'Whether the tag is active',
    example: true
  })
  active: boolean;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2024-01-15T10:00:00Z'
  })
  created_at: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2024-01-15T10:00:00Z'
  })
  updated_at: Date;
}
