import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1669045836574 implements MigrationInterface {
    name = 'createTables1669045836574'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "value" TYPE numeric(10,2)`);
        await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "balance" TYPE numeric(10,2)`);
        await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "balance" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "balance" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "balance" TYPE numeric(10,3)`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "value" TYPE numeric(10,3)`);
    }

}
