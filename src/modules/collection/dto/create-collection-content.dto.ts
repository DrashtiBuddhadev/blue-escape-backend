import {
  IsString,
  IsOptional,
  IsArray,
  IsBoolean,
  ValidateNested,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';

class FeatureDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @ValidateNested()
  @Type(() => Object)
  images: { media: string };
}

class AboutDestinationDto {
  @IsString()
  title: string;

  @IsString()
  content: string;
}

export class CreateCollectionContentDto {
  @IsUUID()
  collection_id: string;

  @IsOptional()
  @IsString()
  hero_media?: string;

  @IsOptional()
  @IsString()
  about_collection?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FeatureDto)
  features?: FeatureDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AboutDestinationDto)
  about_destination?: AboutDestinationDto[];

  @IsOptional()
  @IsString()
  region?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}