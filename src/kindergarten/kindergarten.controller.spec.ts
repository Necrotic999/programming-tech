import { Test, TestingModule } from '@nestjs/testing';
import { KindergartenController } from './kindergarten.controller';
import { KindergartenService } from './kindergarten.service';
import { v4 as uuidv4 } from 'uuid';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('KindergartenController', () => {
  let controller: KindergartenController;
  let service: KindergartenService;

  const childId = uuidv4();

  const child = {
    id: childId,
    childName: 'Дмитро Іваненко',
    age: 4,
    parentEmail: 'roman@gmail.com',
    status: 'pending' as const,
  };

  const dto = {
    childName: 'Дмитро Іваненко',
    age: 4,
    parentEmail: 'roman@gmail.com',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KindergartenController],
      providers: [
        {
          provide: KindergartenService,
          useValue: {
            getAll: jest.fn().mockReturnValue([child]),
            getById: jest.fn().mockReturnValue(child),
            create: jest.fn().mockReturnValue(child),
            updateStatus: jest.fn().mockReturnValue(child),
            delete: jest.fn().mockReturnValue(child),
          },
        },
      ],
    }).compile();

    controller = module.get<KindergartenController>(KindergartenController);
    service = module.get<KindergartenService>(KindergartenService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of children', () => {
    const result = controller.getAll();
    expect(result).toEqual([child]);
  });

  it('should return a child by id', () => {
    const result = controller.getById(childId);
    expect(result).toEqual(child);
  });

  it('should throw an error if child is not found', () => {
    jest.spyOn(service, 'getById').mockImplementationOnce(() => {
      throw new NotFoundException('Child not found');
    });

    expect(() => controller.getById('non-existent-id')).toThrow(
      NotFoundException,
    );
  });

  it('should create a new child', () => {
    const result = controller.create(dto);
    expect(result).toEqual(child);
  });

  it('should throw an error if child age is invalid', () => {
    jest.spyOn(service, 'create').mockImplementationOnce(() => {
      throw new BadRequestException('Invalid child data');
    });

    expect(() => controller.create({ ...dto, age: 0 })).toThrow(
      BadRequestException,
    );
  });

  it('should update the status of a child', () => {
    const result = controller.updateStatus(childId, 'approved');
    expect(result).toEqual(child);
  });

  it('should delete a child', () => {
    const result = controller.delete(childId);
    expect(result).toEqual(child);
  });
});
