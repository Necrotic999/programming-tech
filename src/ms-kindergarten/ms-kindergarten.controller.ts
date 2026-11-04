import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KindergartenService } from '../kindergarten/kindergarten.service';
import { CreateChildDto } from '../kindergarten/dto/kindergarten.dto';

@Controller()
export class MsKindergartenController {
  constructor(private readonly kindergartenService: KindergartenService) {}

  @MessagePattern({ cmd: 'ms_get_all' })
  getAll() {
    return this.kindergartenService.getAll();
  }

  @MessagePattern({ cmd: 'ms_create' })
  create(@Payload() dto: CreateChildDto) {
    return this.kindergartenService.create(dto);
  }

  @MessagePattern({ cmd: 'ms_update_status' })
  updateStatus(
    @Payload()
    data: {
      id: string;
      status: 'pending' | 'approved' | 'rejected';
    },
  ) {
    return this.kindergartenService.updateStatus(data.id, data.status);
  }
}
