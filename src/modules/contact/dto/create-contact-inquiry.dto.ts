import {
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsNumber,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class TravelDatesDto {
  @ApiProperty({
    description: 'Travel start date',
    example: '2024-06-15',
  })
  @IsString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({
    description: 'Travel end date',
    example: '2024-06-22',
  })
  @IsString()
  @IsNotEmpty()
  endDate: string;
}

class BudgetRangeDto {
  @ApiProperty({
    description: 'Minimum budget per person',
    example: 80000,
  })
  @IsNumber()
  min: number;

  @ApiProperty({
    description: 'Maximum budget per person',
    example: 300000,
  })
  @IsNumber()
  max: number;
}

export class CreateContactInquiryDto {
  @ApiProperty({
    description: 'Customer name',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Customer email address',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Customer phone number',
    example: '9876543210',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    description: 'Country code for phone number',
    example: '+91',
    default: '+91',
  })
  @IsString()
  @IsOptional()
  countryCode?: string;

  @ApiProperty({
    description: 'Destination of travel',
    example: 'European Escapes',
  })
  @IsString()
  @IsNotEmpty()
  destination: string;

  @ApiProperty({
    description: 'Travel dates',
    type: TravelDatesDto,
  })
  @ValidateNested()
  @Type(() => TravelDatesDto)
  travelDates: TravelDatesDto;

  @ApiProperty({
    description: 'Number of travelers',
    example: '2 people',
  })
  @IsString()
  @IsNotEmpty()
  travelers: string;

  @ApiProperty({
    description: 'Budget range per person',
    type: BudgetRangeDto,
  })
  @ValidateNested()
  @Type(() => BudgetRangeDto)
  budgetRange: BudgetRangeDto;

  @ApiProperty({
    description: 'Special requests or comments',
    example: 'Anniversary celebration, prefer beachfront hotels',
    required: false,
  })
  @IsString()
  @IsOptional()
  specialRequests?: string;

  @ApiProperty({
    description: 'Type of inquiry',
    example: 'Booking Request',
  })
  @IsString()
  @IsNotEmpty()
  inquiryType: string;

  @ApiProperty({
    description: 'Newsletter subscription preference',
    example: false,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  newsletter?: boolean;
}
