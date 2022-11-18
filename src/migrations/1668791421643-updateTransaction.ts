import { MigrationInterface, QueryRunner } from "typeorm";

export class updateTransaction1668791421643 implements MigrationInterface {
    name = 'updateTransaction1668791421643'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "value" TYPE numeric(8,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "value" TYPE numeric`);
    }

}
