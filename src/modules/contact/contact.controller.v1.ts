import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ContactService } from './contact.service';
import { CreateContactInquiryRequestModel } from './model/create-contact-inquiry-request.model';
import { ContactInquiryResponseModel } from './model/contact-inquiry-response.model';
import { CreateContactInquiryDto } from './dto/create-contact-inquiry.dto';

@ApiTags('contact')
@Controller({ path: 'contact', version: '1' })
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @ApiOperation({ summary: 'Submit a new contact inquiry (Public)' })
  @ApiBody({ type: CreateContactInquiryRequestModel })
  @ApiResponse({
    status: 201,
    description: 'Contact inquiry submitted successfully',
    type: ContactInquiryResponseModel,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @Post()
  create(@Body() createContactInquiryDto: CreateContactInquiryDto) {
    return this.contactService.create(createContactInquiryDto);
  }

  @ApiOperation({ summary: 'Get all contact inquiries (Admin only)' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'List of contact inquiries retrieved successfully',
    type: [ContactInquiryResponseModel],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.contactService.findAll();
  }

  @ApiOperation({ summary: 'Get a specific contact inquiry by ID (Admin only)' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    description: 'Contact inquiry ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Contact inquiry retrieved successfully',
    type: ContactInquiryResponseModel,
  })
  @ApiResponse({ status: 404, description: 'Contact inquiry not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactService.findOne(id);
  }
}
