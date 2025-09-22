import { ApiProperty } from '@nestjs/swagger';

export class BlogContentModel {
  @ApiProperty({
    description: 'Content section title',
    example: 'Introduction'
  })
  title: string;

  @ApiProperty({
    description: 'Content section body',
    example: 'This is the content of the blog section...'
  })
  content: string;
}