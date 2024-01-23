import { MigrationInterface, QueryRunner } from "typeorm";

export class CustomerAddTelegram1705564142468 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "customer" ADD COLUMN "telegram" varchar(255) NULL;

            CREATE TYPE customer_otp_data AS (
                attemp_timestamp timestamp,
                code_1 varchar(5),
                code_2 varchar(5),
                code_3 varchar(5)
            );

            ALTER TABLE "customer" ADD COLUMN "otp_data" customer_otp_data DEFAULT (null, null, null, null);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "customer" DROP COLUMN "otp_data";
            DROP TYPE customer_otp_data;
            ALTER TABLE "customer" DROP COLUMN "telegram";
        `);
    }

}
