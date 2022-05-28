import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryColumn('int')
  id_number: number;

  @Column({ length: 50 })
  first_name: string;

  @Column({ length: 50 })
  last_name: string;

  @Column({ length: 50 })
  email: string;

  @Column({ length: 20 })
  password: string;

  @Column()
  phone_number: number;
}