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

  @Column()
  title: string;

  @Column({ nullable: true })
  featured_media: string;

  @Column('json', { nullable: true })
  taglines: string[];

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  region: string;

  @Column('json', { nullable: true })
  best_time: { from: string; to: string }[];

  @Column('json', { nullable: true })
  carousel_media: string[];

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

  @Column({ type: 'int', nullable: true })
  duration: number;

  @Column({ type: 'int', nullable: true })
  price: number;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}