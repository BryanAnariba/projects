import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyTotalSubtotalProductstbl1705353455938 implements MigrationInterface {
    name = 'ModifyTotalSubtotalProductstbl1705353455938'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "subTotal"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "subTotal" numeric NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "total"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "total" numeric NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "total"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "total" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "subTotal"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "subTotal" integer NOT NULL DEFAULT '0'`);
    }

}
