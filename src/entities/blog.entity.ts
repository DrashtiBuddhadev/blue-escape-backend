import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('blogs')
export class Blog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  featured_media: string;

  @Column({ nullable: true })
  hero_media: string;

  @Column('json', { nullable: true })
  tags: string[];

  @Column('json', { nullable: true })
  tagline: string[];

  @Column({ type: 'text', nullable: true })
  excerpt: string;

  @Column('json')
  content: { title: string; content: string }[];

  @Column({ nullable: true })
  region: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  author_name: string;

  @Column({ type: 'text', nullable: true })
  about_author: string;

  @Column({ nullable: true })
  read_time: string;

  @Column({ default: true })
  active: boolean;

  @Column({ type: 'datetime', nullable: true })
  published_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}