import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BlogCategory } from '../../blog-category/entities/blog-category.entity';
import { BlogTag } from '../../blog-tag/entities/blog-tag.entity';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Index({ unique: true })
  @Column()
  slug: string;

  @Column({ nullable: true })
  coverImage: string;

  @Column({ nullable: true })
  subtitle: string;

  @Column({ nullable: true, type: 'text' })
  shortDescription: string;

  @Column({ nullable: true, type: 'text' })
  longDescription: string;

  @Column({ nullable: true })
  seoTitle: string;

  @Column({ nullable: true })
  seoDescription: string;

  @Column({ default: 'active' })
  status: 'active' | 'inactive';

  @ManyToOne(() => BlogCategory, (category) => category.blogs, { eager: true })
  category: BlogCategory;

  @ManyToMany(() => BlogTag, { eager: true, cascade: true })
  @JoinTable()
  tags: BlogTag[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
