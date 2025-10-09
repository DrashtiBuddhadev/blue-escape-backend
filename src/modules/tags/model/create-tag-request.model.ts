import { ApiProperty } from '@nestjs/swagger';

export class CreateTagRequestModel {
  @ApiProperty({
    description: 'Tag name',
    example: 'Natural Retreat'
  })
  name: string;

  @ApiProperty({
    description: 'Whether the tag is active',
    example: true,
    required: false
  })
  active?: boolean;
}
