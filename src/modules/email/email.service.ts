import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import { LoggerService } from '../../common/logger/logger.service';

@Injectable()
export class EmailService {
  private transporter: Transporter;

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: LoggerService,
  ) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      secure: this.configService.get<boolean>('SMTP_SECURE') === true,
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
    });
  }

  async sendInquiryNotification(inquiryData: any): Promise<void> {
    const startTime = Date.now();
    try {
      const adminEmail = this.configService.get<string>('ADMIN_EMAIL');
      const fromEmail = this.configService.get<string>('FROM_EMAIL');

      const mailOptions = {
        from: fromEmail,
        to: adminEmail,
        subject: `New Contact Inquiry: ${inquiryData.inquiryType}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">New Contact Inquiry Received</h2>

            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
              <h3 style="margin-top: 0;">Customer Information</h3>
              <p><strong>Name:</strong> ${inquiryData.name}</p>
              <p><strong>Email:</strong> ${inquiryData.email}</p>
              <p><strong>Phone:</strong> ${inquiryData.country_code} ${inquiryData.phone}</p>
            </div>

            <div style="margin-top: 20px; background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
              <h3 style="margin-top: 0;">Travel Details</h3>
              <p><strong>Destination:</strong> ${inquiryData.destination}</p>
              <p><strong>Travel Dates:</strong> ${inquiryData.travel_dates.startDate} to ${inquiryData.travel_dates.endDate}</p>
              <p><strong>Number of Travelers:</strong> ${inquiryData.travelers}</p>
              <p><strong>Budget Range:</strong> ₹${inquiryData.budget_range.min.toLocaleString()} - ₹${inquiryData.budget_range.max.toLocaleString()} per person</p>
            </div>

            <div style="margin-top: 20px; background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
              <h3 style="margin-top: 0;">Inquiry Details</h3>
              <p><strong>Inquiry Type:</strong> ${inquiryData.inquiryType}</p>
              ${inquiryData.special_requests ? `<p><strong>Special Requests:</strong> ${inquiryData.special_requests}</p>` : ''}
              <p><strong>Newsletter Subscription:</strong> ${inquiryData.newsletter ? 'Yes' : 'No'}</p>
            </div>

            <p style="margin-top: 20px; color: #666; font-size: 12px;">
              Inquiry ID: ${inquiryData.id}<br>
              Received at: ${new Date(inquiryData.created_at).toLocaleString()}
            </p>
          </div>
        `,
      };

      await this.transporter.sendMail(mailOptions);

      this.logger.info(
        'Admin notification email sent successfully',
        'EmailService',
        { inquiryId: inquiryData.id },
      );

      this.logger.logServiceCall(
        'EmailService',
        'sendInquiryNotification',
        Date.now() - startTime,
        true,
      );
    } catch (error) {
      this.logger.logError(error, 'EmailService.sendInquiryNotification');
      this.logger.logServiceCall(
        'EmailService',
        'sendInquiryNotification',
        Date.now() - startTime,
        false,
      );
      // Don't throw error - email failure shouldn't break the inquiry submission
      this.logger.warn(
        'Failed to send admin notification email, but inquiry was saved',
        'EmailService',
      );
    }
  }

  async sendConfirmationToCustomer(inquiryData: any): Promise<void> {
    const startTime = Date.now();
    try {
      const fromEmail = this.configService.get<string>('FROM_EMAIL');

      const mailOptions = {
        from: fromEmail,
        to: inquiryData.email,
        subject: 'Thank You for Your Inquiry - Blue Escape',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0066cc;">Thank You for Your Inquiry!</h2>

            <p>Dear ${inquiryData.name},</p>

            <p>We have received your inquiry and one of our travel specialists will get back to you within 24 hours.</p>

            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Your Inquiry Summary</h3>
              <p><strong>Destination:</strong> ${inquiryData.destination}</p>
              <p><strong>Travel Dates:</strong> ${inquiryData.travel_dates.startDate} to ${inquiryData.travel_dates.endDate}</p>
              <p><strong>Number of Travelers:</strong> ${inquiryData.travelers}</p>
              <p><strong>Budget Range:</strong> ₹${inquiryData.budget_range.min.toLocaleString()} - ₹${inquiryData.budget_range.max.toLocaleString()} per person</p>
            </div>

            <p>In the meantime, feel free to explore our website for more travel inspiration and destination guides.</p>

            <p style="margin-top: 30px;">
              Best regards,<br>
              <strong>The Blue Escape Team</strong>
            </p>

            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">

            <p style="color: #666; font-size: 12px;">
              Reference ID: ${inquiryData.id}<br>
              This is an automated confirmation email. Please do not reply to this email.
            </p>
          </div>
        `,
      };

      await this.transporter.sendMail(mailOptions);

      this.logger.info(
        'Customer confirmation email sent successfully',
        'EmailService',
        { inquiryId: inquiryData.id, email: inquiryData.email },
      );

      this.logger.logServiceCall(
        'EmailService',
        'sendConfirmationToCustomer',
        Date.now() - startTime,
        true,
      );
    } catch (error) {
      this.logger.logError(error, 'EmailService.sendConfirmationToCustomer');
      this.logger.logServiceCall(
        'EmailService',
        'sendConfirmationToCustomer',
        Date.now() - startTime,
        false,
      );
      // Don't throw error - email failure shouldn't break the inquiry submission
      this.logger.warn(
        'Failed to send customer confirmation email, but inquiry was saved',
        'EmailService',
      );
    }
  }
}
