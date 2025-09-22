import { ApiProperty } from '@nestjs/swagger';

export class CreateCollectionRequestModel {
  @ApiProperty({
    description: 'Collection name',
    example: 'Southeast Asia Adventures'
  })
  name: string;
}