import { ApiProperty } from '@nestjs/swagger';

class TravelDatesRequestModel {
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

class BudgetRangeRequestModel {
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

export class CreateContactInquiryRequestModel {
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
    required: false,
    default: '+91',
  })
  countryCode?: string;

  @ApiProperty({
    description: 'Destination of travel',
    example: 'European Escapes',
  })
  destination: string;

  @ApiProperty({
    description: 'Travel dates',
    type: TravelDatesRequestModel,
  })
  travelDates: TravelDatesRequestModel;

  @ApiProperty({
    description: 'Number of travelers',
    example: '2 people',
  })
  travelers: string;

  @ApiProperty({
    description: 'Budget range per person',
    type: BudgetRangeRequestModel,
  })
  budgetRange: BudgetRangeRequestModel;

  @ApiProperty({
    description: 'Special requests or comments',
    example: 'Anniversary celebration, prefer beachfront hotels',
    required: false,
  })
  specialRequests?: string;

  @ApiProperty({
    description: 'Type of inquiry',
    example: 'Booking Request',
  })
  inquiryType: string;

  @ApiProperty({
    description: 'Newsletter subscription preference',
    example: false,
    required: false,
    default: false,
  })
  newsletter?: boolean;
}
