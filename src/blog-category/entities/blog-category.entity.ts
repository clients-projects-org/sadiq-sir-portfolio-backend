import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Blog } from '../../blog/entities/blog.entity';

@Entity()
export class BlogCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ default: 'active' })
  status: 'active' | 'inactive';

  @OneToMany(() => Blog, (blog) => blog.category)
  blogs: Blog[];
}
