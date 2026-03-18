import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  studentId: string; // 2023-00000

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  course: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  gender: string;

  @Column()
  birthDate: string;

  @Column()
  guardian: string;

  @Column()
  contactNumber: string;

  @Column({ type: 'text', nullable: true })
  photo: string;
}