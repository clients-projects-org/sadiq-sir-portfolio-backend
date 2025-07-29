import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Research {
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

  @Column({ nullable: true })
  externalLink: string;

  @Column({ nullable: true })
  status: 'active' | 'inactive';
}
