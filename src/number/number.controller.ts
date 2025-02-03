import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { NumberService } from './number.service';

@Controller('api')
export class NumberController {
  constructor(private readonly numberService: NumberService) {}

  @Get('classify-number')
  async classifyNumber(@Query('number') number: string) {
    try {
      return await this.numberService.classifyNumber(number);
    } catch (error) {
      throw new BadRequestException({
        number: number,
        error: true,
      });
    }
  }
}
