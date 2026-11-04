import { Test, TestingModule } from '@nestjs/testing';
import { MsKindergartenController } from './ms-kindergarten.controller';
import { KindergartenService } from '../kindergarten/kindergarten.service';
import { v4 as uuidv4 } from 'uuid';

describe('MsKindergartenController', () => {
  let controller: MsKindergartenController;
  let getAllMock: jest.Mock;

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
    getAllMock = jest.fn().mockReturnValue([child]);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MsKindergartenController],
      providers: [
        {
          provide: KindergartenService,
          useValue: {
            getAll: getAllMock,
            create: jest.fn().mockReturnValue(child),
            updateStatus: jest.fn().mockReturnValue(child),
          },
        },
      ],
    }).compile();

    controller = module.get<MsKindergartenController>(MsKindergartenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should handle ms_get_all pattern and return children', () => {
    const result = controller.getAll();
    expect(result).toEqual([child]);
    expect(getAllMock).toHaveBeenCalled();
  });

  it('should handle ms_create pattern and create a child', () => {
    const result = controller.create(dto);
    expect(result).toEqual(child);
  });

  it('should handle ms_update_status pattern and update child status', () => {
    const result = controller.updateStatus({ id: childId, status: 'approved' });
    expect(result).toEqual(child);
  });
});
