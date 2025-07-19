import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  subtitle: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ nullable: true })
  externalLink: string;

  @Column({ nullable: true })
  status: 'active' | 'inactive';
}
