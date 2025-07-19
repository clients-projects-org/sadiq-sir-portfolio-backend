import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class BlogTag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
}
