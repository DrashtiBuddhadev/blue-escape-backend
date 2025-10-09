import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('contact_inquiries')
export class ContactInquiry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Personal Info
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ default: '+91' })
  country_code: string;

  // Travel Details
  @Column()
  destination: string;

  @Column('json')
  travel_dates: {
    startDate: string;
    endDate: string;
  };

  @Column()
  travelers: string;

  @Column('json')
  budget_range: {
    min: number;
    max: number;
  };

  @Column({ type: 'text', nullable: true })
  special_requests: string;

  // Inquiry Type
  @Column()
  inquiry_type: string;

  // Newsletter
  @Column({ default: false })
  newsletter: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
