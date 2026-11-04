import { KindergartenService } from './kindergarten.service';
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';

describe('KindergartenService', () => {
  let service: KindergartenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KindergartenService],
    }).compile();

    service = module.get<KindergartenService>(KindergartenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of children', () => {
    const result = service.getAll();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);
  });

  it('should return a child by id', () => {
    const existingChild = service.getAll()[0];
    const result = service.getById(existingChild.id);
    expect(result).toEqual(existingChild);
  });

  it('should create a new child', () => {
    const dto = {
      childName: 'Нова Дитина',
      age: 5,
      parentEmail: 'new@gmail.com',
    };
    const result = service.create(dto);
    expect(result).toHaveProperty('id');
    expect(result.childName).toBe(dto.childName);
    expect(result.status).toBe('pending');
  });

  it('should throw BadRequestException if age is invalid', () => {
    const invalidDto = {
      childName: 'Тест',
      age: 10, // Недопустимый возраст
      parentEmail: 'test@gmail.com',
    };
    expect(() => service.create(invalidDto)).toThrow(BadRequestException);
  });

  it('should update the status of a child', () => {
    const existingChild = service.getAll()[0];
    const result = service.updateStatus(existingChild.id, 'approved');
    expect(result.status).toBe('approved');
  });

  it('should delete a child', () => {
    const existingChild = service.getAll()[0];
    const result = service.delete(existingChild.id);
    expect(result.id).toBe(existingChild.id);
    expect(service.getAll().length).toBe(1);
  });
});
