import { Test, TestingModule } from '@nestjs/testing';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';

interface mockChild {
  id: string;
  childName: string;
  age: number;
  parentEmail: string;
  status: 'pending' | 'approved' | 'rejected';
}

describe('AnalyticsController', () => {
  let controller: AnalyticsController;

  const mockChildren = [
    { id: '1', childName: 'Олександр', age: 3, status: 'pending' },
    { id: '2', childName: 'Марія', age: 5, status: 'approved' },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnalyticsController],
      providers: [AnalyticsService],
    }).compile();

    controller = module.get<AnalyticsController>(AnalyticsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should calculate queue statistics correctly', () => {
    const result = controller.getStatistics(mockChildren as mockChild[]);

    expect(result).toEqual({
      totalApplications: 2,
      pendingCount: 1,
      approvedCount: 1,
      rejectedCount: 0,
    });
  });
});
