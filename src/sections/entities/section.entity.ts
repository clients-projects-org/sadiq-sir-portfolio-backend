import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Section {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  key: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  subtitle: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ nullable: true })
  status: 'active' | 'inactive';
}
