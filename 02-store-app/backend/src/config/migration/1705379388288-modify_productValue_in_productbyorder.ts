import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyProductValueInProductbyorder1705379388288 implements MigrationInterface {
    name = 'ModifyProductValueInProductbyorder1705379388288'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_by_order" ALTER COLUMN "productValue" TYPE numeric`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_by_order" ALTER COLUMN "productValue" TYPE numeric(2,0)`);
    }

}
