import { Module } from '@nestjs/common';
import { MsKindergartenController } from './ms-kindergarten.controller';
import { KindergartenModule } from 'src/kindergarten/kindergarten.module';

@Module({
  imports: [KindergartenModule],
  controllers: [MsKindergartenController],
})
export class MsKindergartenModule {}
