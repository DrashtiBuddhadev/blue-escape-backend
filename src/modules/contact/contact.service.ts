import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactInquiry } from '../../entities/contact-inquiry.entity';
import { CreateContactInquiryDto } from './dto/create-contact-inquiry.dto';
import { LoggerService } from '../../common/logger/logger.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactInquiry)
    private readonly contactInquiryRepository: Repository<ContactInquiry>,
    private readonly logger: LoggerService,
    private readonly emailService: EmailService,
  ) {}

  async create(
    createContactInquiryDto: CreateContactInquiryDto,
  ): Promise<ContactInquiry> {
    const startTime = Date.now();
    try {
      this.logger.info('Creating new contact inquiry', 'ContactService', {
        email: createContactInquiryDto.email,
      });

      const inquiry = this.contactInquiryRepository.create({
        name: createContactInquiryDto.name,
        email: createContactInquiryDto.email,
        phone: createContactInquiryDto.phone,
        country_code: createContactInquiryDto.countryCode || '+91',
        destination: createContactInquiryDto.destination,
        travel_dates: createContactInquiryDto.travelDates,
        travelers: createContactInquiryDto.travelers,
        budget_range: createContactInquiryDto.budgetRange,
        special_requests: createContactInquiryDto.specialRequests,
        inquiry_type: createContactInquiryDto.inquiryType,
        newsletter: createContactInquiryDto.newsletter || false,
      });

      const result = await this.contactInquiryRepository.save(inquiry);

      // Send emails asynchronously (don't wait for them to complete)
      this.emailService.sendInquiryNotification(result).catch((error) => {
        this.logger.logError(error, 'ContactService.create - sendInquiryNotification');
      });

      this.emailService.sendConfirmationToCustomer(result).catch((error) => {
        this.logger.logError(error, 'ContactService.create - sendConfirmationToCustomer');
      });

      this.logger.logServiceCall(
        'ContactService',
        'create',
        Date.now() - startTime,
        true,
        { inquiryId: result.id },
      );
      return result;
    } catch (error) {
      this.logger.logError(error, 'ContactService.create');
      this.logger.logServiceCall(
        'ContactService',
        'create',
        Date.now() - startTime,
        false,
      );
      throw error;
    }
  }

  async findAll(): Promise<ContactInquiry[]> {
    const startTime = Date.now();
    try {
      this.logger.info('Fetching all contact inquiries', 'ContactService');
      const result = await this.contactInquiryRepository.find({
        order: { created_at: 'DESC' },
      });
      this.logger.logServiceCall(
        'ContactService',
        'findAll',
        Date.now() - startTime,
        true,
        { count: result.length },
      );
      return result;
    } catch (error) {
      this.logger.logError(error, 'ContactService.findAll');
      this.logger.logServiceCall(
        'ContactService',
        'findAll',
        Date.now() - startTime,
        false,
      );
      throw error;
    }
  }

  async findOne(id: string): Promise<ContactInquiry> {
    const startTime = Date.now();
    try {
      this.logger.info('Fetching contact inquiry by ID', 'ContactService', {
        inquiryId: id,
      });
      const inquiry = await this.contactInquiryRepository.findOne({
        where: { id },
      });

      if (!inquiry) {
        this.logger.warn(
          `Contact inquiry with ID "${id}" not found`,
          'ContactService',
        );
        throw new NotFoundException(
          `Contact inquiry with ID "${id}" not found`,
        );
      }

      this.logger.logServiceCall(
        'ContactService',
        'findOne',
        Date.now() - startTime,
        true,
        { inquiryId: id },
      );
      return inquiry;
    } catch (error) {
      this.logger.logError(error, 'ContactService.findOne');
      this.logger.logServiceCall(
        'ContactService',
        'findOne',
        Date.now() - startTime,
        false,
      );
      throw error;
    }
  }
}
