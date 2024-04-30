import { Injectable } from '@nestjs/common';

@Injectable()
export class JobConsumerAppService {
  getHello(): string {
    return 'Hello from Job-Consumer!';
  }
}
