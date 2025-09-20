import {
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ExperienceContentDto {
  @IsString()
  title: string;

  @IsString()
  content: string;
}

class BestTimeDto {
  @IsString()
  from: string;

  @IsString()
  to: string;
}

class GalleryItemDto {
  @IsString()
  name: string;

  @IsString()
  image: string;
}

export class CreateExperienceDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  featured_media?: string;

  @IsOptional()
  @IsString()
  excerpt?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  region?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BestTimeDto)
  best_time?: BestTimeDto[];

  @IsOptional()
  @IsString()
  carousel_media?: string;

  @IsOptional()
  @IsString()
  brief_description?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExperienceContentDto)
  content?: ExperienceContentDto[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GalleryItemDto)
  gallery?: GalleryItemDto[];

  @IsOptional()
  @IsString()
  story?: string;
}