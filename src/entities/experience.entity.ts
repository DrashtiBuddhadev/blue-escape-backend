import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('experiences')
export class Experience {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  featured_media: string;

  @Column({ type: 'text', nullable: true })
  excerpt: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  region: string;

  @Column('json', { nullable: true })
  best_time: { from: string; to: string }[];

  @Column({ type: 'text', nullable: true })
  carousel_media: string;

  @Column({ type: 'text', nullable: true })
  brief_description: string;

  @Column('json', { nullable: true })
  content: { title: string; content: string }[];

  @Column('json', { nullable: true })
  tags: string[];

  @Column('json', { nullable: true })
  gallery: { name: string; image: string }[];

  @Column({ type: 'text', nullable: true })
  story: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}