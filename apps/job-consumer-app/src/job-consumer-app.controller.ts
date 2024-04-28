import { Controller, Get } from '@nestjs/common';
import { JobConsumerAppService } from './job-consumer-app.service';

@Controller()
export class JobConsumerAppController {
  constructor(private readonly jobConsumerAppService: JobConsumerAppService) {}

  @Get()
  getHello(): string {
    return this.jobConsumerAppService.getHello();
  }
}
