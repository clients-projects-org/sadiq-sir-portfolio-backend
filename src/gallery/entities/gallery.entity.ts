import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GalleryCategory } from '../../gallery-category/entities/gallery-category.entity';

@Entity()
export class Gallery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  image: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  subtitle: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ default: 'active' })
  status: 'active' | 'inactive';

  @ManyToOne(() => GalleryCategory, (category) => category.galleries, {
    eager: true,
  })
  category: GalleryCategory;
}
