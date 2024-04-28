import { NestFactory } from '@nestjs/core';
import { LedgerAppModule } from './ledger-app.module';

async function bootstrap() {
  const app = await NestFactory.create(LedgerAppModule);
  await app.listen(process.env.LEDGER_PORT || 3000);
}
bootstrap();
