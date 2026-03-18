import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private repo: Repository<Student>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  create(data: Partial<Student>) {
    const student = this.repo.create(data);
    return this.repo.save(student);
  }

  update(id: number, data: Partial<Student>) {
    return this.repo.update(id, data);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}