import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Collection } from './collection.entity';

@Entity('collection_contents')
export class CollectionContent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  collection_id: string;

  @ManyToOne(() => Collection, (collection) => collection.contents)
  @JoinColumn({ name: 'collection_id' })
  collection: Collection;

  @Column({ nullable: true })
  hero_media: string;

  @Column({ nullable: true })
  featured_img: string;

  @Column({ type: 'text', nullable: true })
  about_collection: string;

  @Column('json', { nullable: true })
  features: {
    title: string;
    content: string;
    images: { media: string[] };
  }[];

  @Column('json', { nullable: true })
  about_destination: { description: string };

  @Column({ nullable: true })
  region: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  property_name: string;

  @Column('json', { nullable: true })
  tags: string[];

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}