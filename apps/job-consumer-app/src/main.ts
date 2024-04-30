import { NestFactory } from '@nestjs/core';
import { JobConsumerAppModule } from './job-consumer-app.module';

async function bootstrap() {
  const app = await NestFactory.create(JobConsumerAppModule);
  await app.listen(process.env.JOB_CONSUMER_PORT || 3001);
}
bootstrap();
