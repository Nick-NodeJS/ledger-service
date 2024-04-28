import { Module } from '@nestjs/common';
import { JobConsumerAppController } from './job-consumer-app.controller';
import { JobConsumerAppService } from './job-consumer-app.service';

@Module({
  imports: [],
  controllers: [JobConsumerAppController],
  providers: [JobConsumerAppService],
})
export class JobConsumerAppModule {}
