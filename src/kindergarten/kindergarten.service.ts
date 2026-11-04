import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateChildDto } from './dto/kindergarten.dto';

export interface Child {
  id: string;
  childName: string;
  age: number;
  parentEmail: string;
  status: 'pending' | 'approved' | 'rejected';
}

@Injectable()
export class KindergartenService {
  private queue: Child[] = [
    {
      id: uuidv4(),
      childName: 'Олександр Петренко',
      age: 4,
      parentEmail: 'ivan@gmail.com',
      status: 'pending',
    },
    {
      id: uuidv4(),
      childName: 'Марія Коваленко',
      age: 3,
      parentEmail: 'olya@gmail.com',
      status: 'approved',
    },
  ];

  getAll(): Child[] {
    return this.queue;
  }

  getById(id: string): Child {
    const child = this.queue.find((child) => child.id === id);
    if (!child) {
      throw new NotFoundException(`Child with id ${id} not found`);
    }

    return child;
  }

  create(dto: CreateChildDto): Child {
    const { childName, age, parentEmail } = dto;
    if (!childName || !age || !parentEmail || age < 1 || age > 6) {
      throw new BadRequestException(
        'Invalid child data. Please provide a valid name, age (1-6), and parent email.',
      );
    }

    const newChild = {
      id: uuidv4(),
      ...dto,
      status: 'pending' as const,
    };

    this.queue.push(newChild);
    return newChild;
  }

  updateStatus(id: string, status: 'pending' | 'approved' | 'rejected'): Child {
    const child = this.getById(id);
    child.status = status;

    return child;
  }

  delete(id: string): Child {
    const child = this.getById(id);
    this.queue = this.queue.filter((child) => child.id !== id);

    return child;
  }
}
