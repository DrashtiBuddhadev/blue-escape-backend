import { PartialType } from '@nestjs/mapped-types';
import { CreateCollectionContentDto } from './create-collection-content.dto';

export class UpdateCollectionContentDto extends PartialType(CreateCollectionContentDto) {}