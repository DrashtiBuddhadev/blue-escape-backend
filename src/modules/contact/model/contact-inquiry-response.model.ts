import { ApiProperty } from '@nestjs/swagger';

class TravelDatesModel {
  @ApiProperty({
    description: 'Travel start date',
    example: '2024-06-15',
  })
  startDate: string;

  @ApiProperty({
    description: 'Travel end date',
    example: '2024-06-22',
  })
  endDate: string;
}

class BudgetRangeModel {
  @ApiProperty({
    description: 'Minimum budget per person',
    example: 80000,
  })
  min: number;

  @ApiProperty({
    description: 'Maximum budget per person',
    example: 300000,
  })
  max: number;
}

export class ContactInquiryResponseModel {
  @ApiProperty({
    description: 'Inquiry ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Customer name',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'Customer email address',
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Customer phone number',
    example: '9876543210',
  })
  phone: string;

  @ApiProperty({
    description: 'Country code for phone number',
    example: '+91',
  })
  country_code: string;

  @ApiProperty({
    description: 'Destination of travel',
    example: 'European Escapes',
  })
  destination: string;

  @ApiProperty({
    description: 'Travel dates',
    type: TravelDatesModel,
  })
  travel_dates: TravelDatesModel;

  @ApiProperty({
    description: 'Number of travelers',
    example: '2 people',
  })
  travelers: string;

  @ApiProperty({
    description: 'Budget range per person',
    type: BudgetRangeModel,
  })
  budget_range: BudgetRangeModel;

  @ApiProperty({
    description: 'Special requests or comments',
    example: 'Anniversary celebration, prefer beachfront hotels',
    required: false,
  })
  special_requests?: string;

  @ApiProperty({
    description: 'Type of inquiry',
    example: 'Booking Request',
  })
  inquiry_type: string;

  @ApiProperty({
    description: 'Newsletter subscription preference',
    example: false,
  })
  newsletter: boolean;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2024-01-15T10:00:00Z',
  })
  created_at: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2024-01-15T10:00:00Z',
  })
  updated_at: Date;
}
