import { RequestContextModule } from 'nestjs-request-context';

import { Global, Module } from '@nestjs/common';

import { ContextService } from './context.service';

@Global()
@Module({
  imports: [RequestContextModule],
  providers: [ContextService],
  exports: [ContextService],
})
export class ContextModule {}
