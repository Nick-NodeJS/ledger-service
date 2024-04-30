import { Test, TestingModule } from '@nestjs/testing';
import { JobConsumerAppController } from './job-consumer-app.controller';
import { JobConsumerAppService } from './job-consumer-app.service';

describe('JobConsumerAppController', () => {
  let jobConsumerAppController: JobConsumerAppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [JobConsumerAppController],
      providers: [JobConsumerAppService],
    }).compile();

    jobConsumerAppController = app.get<JobConsumerAppController>(
      JobConsumerAppController,
    );
  });

  describe('root', () => {
    it('should return "Hello from Job-Consumer!"', () => {
      expect(jobConsumerAppController.getHello()).toBe(
        'Hello from Job-Consumer!',
      );
    });
  });
});
