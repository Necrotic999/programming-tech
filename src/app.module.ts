import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KindergartenModule } from './kindergarten/kindergarten.module';
import { MsKindergartenModule } from './ms-kindergarten/ms-kindergarten.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [KindergartenModule, MsKindergartenModule, AnalyticsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
