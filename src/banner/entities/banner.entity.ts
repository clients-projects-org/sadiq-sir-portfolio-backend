import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Banner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  subtitle: string;

  @Column()
  banner: string;

  @Column()
  banner_description: string;

  @Column()
  banner_title: string;

  @Column()
  image_subtitle: string;

  @Column({ nullable: true })
  imagePath: string;
}
