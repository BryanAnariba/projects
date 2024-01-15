import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterImageFieldTypeInProduct1705278918540 implements MigrationInterface {
    name = 'AlterImageFieldTypeInProduct1705278918540'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "image" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "image" bytea`);
    }

}
