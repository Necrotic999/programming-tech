import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { KindergartenService } from './kindergarten.service';
import { CreateChildDto } from './dto/kindergarten.dto';

@Controller('kindergarten')
export class KindergartenController {
  constructor(private readonly kindergartenService: KindergartenService) {}

  @Get()
  getAll() {
    return this.kindergartenService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.kindergartenService.getById(id);
  }

  @Post()
  create(@Body() dto: CreateChildDto) {
    return this.kindergartenService.create(dto);
  }

  @Patch(':id')
  updateStatus(
    @Param('id') id: string,
    @Body() status: 'pending' | 'approved' | 'rejected',
  ) {
    return this.kindergartenService.updateStatus(id, status);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.kindergartenService.delete(id);
  }
}
