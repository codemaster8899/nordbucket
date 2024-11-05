import { MigrationInterface, QueryRunner } from "typeorm";

export class CustomIds1727873073406 implements MigrationInterface {

    name = 'CustomIds1727873073406'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "custom_ids" (
                "id" SERIAL NOT NULL,
                "custom_id" character varying NOT NULL,
                "customer_id" character varying NOT NULL,
                "country" character varying NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "FK_customer_id" FOREIGN KEY ("customer_id") REFERENCES "customer" ("id") ON DELETE CASCADE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "custom_ids"`);
    }

}
