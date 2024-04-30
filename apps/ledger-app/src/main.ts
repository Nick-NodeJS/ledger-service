import { NestFactory } from '@nestjs/core';
import { LedgerAppModule } from './ledger-app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { setupApp } from '@app/common/app';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(LedgerAppModule, {
    cors: true,
    bodyParser: true,
    abortOnError: false,
  });

  await setupApp(app);
}
bootstrap();
