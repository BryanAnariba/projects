import { MigrationInterface, QueryRunner } from "typeorm";

export class AddManyToManyRelationship1705376833524 implements MigrationInterface {
    name = 'AddManyToManyRelationship1705376833524'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_by_order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantityProduct" integer NOT NULL, "productValue" numeric(2) NOT NULL, "orderId" uuid, "productId" uuid, CONSTRAINT "PK_7c705a89a00fb70cc12b4a93b5c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product_by_order" ADD CONSTRAINT "FK_bb20d89406e2718124b0215ed13" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_by_order" ADD CONSTRAINT "FK_5685c15444a52466703ea6267f7" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_by_order" DROP CONSTRAINT "FK_5685c15444a52466703ea6267f7"`);
        await queryRunner.query(`ALTER TABLE "product_by_order" DROP CONSTRAINT "FK_bb20d89406e2718124b0215ed13"`);
        await queryRunner.query(`DROP TABLE "product_by_order"`);
    }

}
