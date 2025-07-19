import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Social {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  icon: string;

  @Column()
  url: string;

  @Column({ default: 'active' })
  status: 'active' | 'inactive';
}
