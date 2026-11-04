import { Injectable } from '@nestjs/common';
import { Child } from 'src/kindergarten/kindergarten.service';

@Injectable()
export class AnalyticsService {
  calculateStats(children: any[]) {
    const total = children.length;
    const pending = children.filter(
      (c: Child) => c.status === 'pending',
    ).length;
    const approved = children.filter(
      (c: Child) => c.status === 'approved',
    ).length;
    const rejected = children.filter(
      (c: Child) => c.status === 'rejected',
    ).length;

    return {
      totalApplications: total,
      pendingCount: pending,
      approvedCount: approved,
      rejectedCount: rejected,
    };
  }
}
