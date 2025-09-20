import {
  IsString,
  IsOptional,
  IsArray,
  IsBoolean,
  IsNumber,
  IsDateString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class BlogContentDto {
  @IsString()
  title: string;

  @IsString()
  content: string;
}

export class CreateBlogDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  featured_media?: string;

  @IsOptional()
  @IsString()
  hero_media?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  excerpt?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BlogContentDto)
  content: BlogContentDto[];

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
  @IsString()
  author_name?: string;

  @IsOptional()
  @IsString()
  about_author?: string;

  @IsOptional()
  @IsString()
  read_time?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @IsDateString()
  published_at?: Date;
}