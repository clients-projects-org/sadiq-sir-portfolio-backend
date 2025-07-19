import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class AboutMe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  subtitle: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  image1: string;

  @Column({ nullable: true })
  image2: string;
}
