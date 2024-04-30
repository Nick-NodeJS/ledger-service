import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialEntitiesCreation1714427343656 implements MigrationInterface {
    name = 'InitialEntitiesCreation1714427343656'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "currencies" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "code" character varying NOT NULL, "decimals" integer NOT NULL, "name" character varying NOT NULL, "symbol" character varying NOT NULL, CONSTRAINT "UQ_db24858126e7602016893d9742e" UNIQUE ("code"), CONSTRAINT "PK_e7d1df84669f7b67f4c4242d60a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ledgers" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "balance" integer NOT NULL, "currency_code" character varying NOT NULL, CONSTRAINT "PK_e8af998892a129f7cf69285d601" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "amount" integer NOT NULL, "recipient_ledger_id" integer NOT NULL, "sender_ledger_id" integer NOT NULL, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ledgers" ADD CONSTRAINT "FK_51835843c670ce0d14d7352bae0" FOREIGN KEY ("currency_code") REFERENCES "carrencies"("code") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_ac704d7d96d437c73b6fe60e425" FOREIGN KEY ("recipient_ledger_id") REFERENCES "ledgers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_86c097479bc9866f1955d4a8668" FOREIGN KEY ("sender_ledger_id") REFERENCES "ledgers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_86c097479bc9866f1955d4a8668"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_ac704d7d96d437c73b6fe60e425"`);
        await queryRunner.query(`ALTER TABLE "ledgers" DROP CONSTRAINT "FK_51835843c670ce0d14d7352bae0"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`DROP TABLE "ledgers"`);
        await queryRunner.query(`DROP TABLE "currencies"`);
    }

}
