import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Gallery } from '../../gallery/entities/gallery.entity';

@Entity()
export class GalleryCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 'active' })
  status: 'active' | 'inactive';

  @OneToMany(() => Gallery, (gallery) => gallery.category)
  galleries: Gallery[];
}
