import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImageToProductTbl1705212443287 implements MigrationInterface {
    name = 'AddImageToProductTbl1705212443287'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "image" bytea`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "image"`);
    }

}
