import { Module } from '@nestjs/common';
import { NumberController } from './number.controller';
import { NumberService } from './number.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [NumberController],
  providers: [NumberService],
})
export class NumberModule {}
