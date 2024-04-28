import { Test, TestingModule } from '@nestjs/testing';
import { LedgerAppController } from './ledger-app.controller';
import { LedgerAppService } from './ledger-app.service';

describe('LedgerAppController', () => {
  let ledgerAppController: LedgerAppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LedgerAppController],
      providers: [LedgerAppService],
    }).compile();

    ledgerAppController = app.get<LedgerAppController>(LedgerAppController);
  });

  describe('root', () => {
    it('should return "Hello from Ledger Service!"', () => {
      expect(ledgerAppController.getHello()).toBe('Hello from Ledger Service!');
    });
  });
});
