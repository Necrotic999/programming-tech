import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AnalyticsService } from './analytics.service';
import { Child } from 'src/kindergarten/kindergarten.service';

@Controller()
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @MessagePattern({ cmd: 'get_statistics' })
  getStatistics(@Payload() children: Child[]) {
    return this.analyticsService.calculateStats(children);
  }
}
