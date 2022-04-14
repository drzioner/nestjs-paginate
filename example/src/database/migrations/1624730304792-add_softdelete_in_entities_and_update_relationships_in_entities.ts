import { MigrationInterface, QueryRunner } from 'typeorm';

export class addSoftdeleteInEntitiesAndUpdateRelationshipsInEntities1624730304792
  implements MigrationInterface
{
  name = 'addSoftdeleteInEntitiesAndUpdateRelationshipsInEntities1624730304792';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "permission_roles"`);
    await queryRunner.query(`DROP TABLE "role_users"`);
    await queryRunner.query(
      `ALTER TABLE "cities" DROP CONSTRAINT "FK_49cb607941062b15a336a18c887"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastname"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "photo_url"`);
    await queryRunner.query(`ALTER TABLE "cities" DROP COLUMN "departmentId"`);
    await queryRunner.query(`ALTER TABLE "tokens" ADD "deleted_at" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "contacts" ADD "deleted_at" TIMESTAMP`,
    );
    await queryRunner.query(`ALTER TABLE "roles" ADD "deleted_at" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "identification_types" ADD "deleted_at" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" ADD "status" character varying(8) NOT NULL DEFAULT 'ACTIVE'`,
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" ADD "deleted_at" TIMESTAMP`,
    );
    await queryRunner.query(`ALTER TABLE "users" ADD "deleted_at" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "person_types" ADD "deleted_at" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "departments" ADD "deleted_at" TIMESTAMP`,
    );
    await queryRunner.query(`ALTER TABLE "cities" ADD "deleted_at" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "cities" ADD "department_id" integer`);
    await queryRunner.query(`ALTER TABLE "tokens" DROP COLUMN "status"`);
    await queryRunner.query(
      `ALTER TABLE "tokens" ADD "status" character varying(8) NOT NULL DEFAULT 'ACTIVE'`,
    );
    await queryRunner.query(
      `ALTER TABLE "contacts" DROP CONSTRAINT "FK_118bc4afb085a5f7ce6dbdfc8cb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contacts" ALTER COLUMN "lastname" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "contacts" ALTER COLUMN "identification_number" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "contacts" ALTER COLUMN "identification_type_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "contacts" DROP COLUMN "department_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contacts" ADD "department_id" integer`,
    );
    await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "city_id"`);
    await queryRunner.query(`ALTER TABLE "contacts" ADD "city_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "roles" DROP CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7"`,
    );
    await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "roles" ADD "name" character varying(50) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles" ADD CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name")`,
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" DROP CONSTRAINT "UQ_48ce552495d14eae9b187bb6716"`,
    );
    await queryRunner.query(`ALTER TABLE "permissions" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "permissions" ADD "name" character varying(100) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" ADD CONSTRAINT "UQ_48ce552495d14eae9b187bb6716" UNIQUE ("name")`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "name" character varying(250) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "username" character varying(100) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username")`,
    );
    await queryRunner.query(
      `ALTER TABLE "contacts" ADD CONSTRAINT "FK_118bc4afb085a5f7ce6dbdfc8cb" FOREIGN KEY ("identification_type_id") REFERENCES "identification_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "contacts" ADD CONSTRAINT "FK_87c56a749855e1bb90f06dba16f" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "contacts" ADD CONSTRAINT "FK_f00e42b3699b410c8d436c7fbed" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cities" ADD CONSTRAINT "FK_2a0ffcba8da5d806b1f98454cd4" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cities" DROP CONSTRAINT "FK_2a0ffcba8da5d806b1f98454cd4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contacts" DROP CONSTRAINT "FK_f00e42b3699b410c8d436c7fbed"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contacts" DROP CONSTRAINT "FK_87c56a749855e1bb90f06dba16f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contacts" DROP CONSTRAINT "FK_118bc4afb085a5f7ce6dbdfc8cb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "username" character varying(40) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username")`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "name" character varying(150) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" DROP CONSTRAINT "UQ_48ce552495d14eae9b187bb6716"`,
    );
    await queryRunner.query(`ALTER TABLE "permissions" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "permissions" ADD "name" character varying(25) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" ADD CONSTRAINT "UQ_48ce552495d14eae9b187bb6716" UNIQUE ("name")`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles" DROP CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7"`,
    );
    await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "roles" ADD "name" character varying(25) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles" ADD CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name")`,
    );
    await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "city_id"`);
    await queryRunner.query(
      `ALTER TABLE "contacts" ADD "city_id" numeric NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "contacts" DROP COLUMN "department_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contacts" ADD "department_id" numeric NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "contacts" ALTER COLUMN "identification_type_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "contacts" ALTER COLUMN "identification_number" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "contacts" ALTER COLUMN "lastname" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "contacts" ADD CONSTRAINT "FK_118bc4afb085a5f7ce6dbdfc8cb" FOREIGN KEY ("identification_type_id") REFERENCES "identification_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "tokens" DROP COLUMN "status"`);
    await queryRunner.query(
      `ALTER TABLE "tokens" ADD "status" character varying(20) NOT NULL DEFAULT 'ACTIVE'`,
    );
    await queryRunner.query(`ALTER TABLE "cities" DROP COLUMN "department_id"`);
    await queryRunner.query(`ALTER TABLE "cities" DROP COLUMN "deleted_at"`);
    await queryRunner.query(
      `ALTER TABLE "departments" DROP COLUMN "deleted_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "person_types" DROP COLUMN "deleted_at"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted_at"`);
    await queryRunner.query(
      `ALTER TABLE "permissions" DROP COLUMN "deleted_at"`,
    );
    await queryRunner.query(`ALTER TABLE "permissions" DROP COLUMN "status"`);
    await queryRunner.query(
      `ALTER TABLE "identification_types" DROP COLUMN "deleted_at"`,
    );
    await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "tokens" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "cities" ADD "departmentId" integer`);
    await queryRunner.query(`ALTER TABLE "users" ADD "photo_url" text`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "phone" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "lastname" character varying(150) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "cities" ADD CONSTRAINT "FK_49cb607941062b15a336a18c887" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
